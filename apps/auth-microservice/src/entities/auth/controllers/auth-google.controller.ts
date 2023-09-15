import { Body, Controller, Get, Ip, Post, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGurad } from '../guards-handlers/guards'
import { Request, Response } from 'express'
import { GoogleRegisterDTO } from '../core/dtos/google-register.dto'
import { AuthService } from '../auth.service'
import { TokensType } from '../application/commands/handlers'
import { CONFIG } from 'apps/auth-microservice/config'
import { UserAgent } from 'apps/auth-microservice/src/decorators'
import { JwtEnum } from 'helpers/enums'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Google oAuth')
@Controller('auth/google')
export class AuthGoogleController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@UseGuards(GoogleGurad)
	public google(): void {}

	@Get('callback')
	@UseGuards(GoogleGurad)
	public googleCallback(@Req() req: Request, @Res() res: Response): void {
		// @ts-ignore
		const accessToken: string = req.user.accessToken
		console.log(accessToken)
		res.redirect(`${CONFIG.FRONTEND_HOST}/auth/google?accessToken=${accessToken}`)
	}

	@Post('register')
	public async googleRegister(
		@Body() dto: GoogleRegisterDTO,
		@UserAgent() userAgent: string,
		@Ip() userIP: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensType = await this.authService.googleRegister(dto, {
			userIP,
			userAgent
		})
		return this.setTokensToResponse(tokens, res)
	}

	// helpers
	private async setTokensToResponse(tokens: TokensType, res: Response) {
		res.cookie(JwtEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: new Date(Number(CONFIG.JWT_REFRESH_EXPIRES))
		})
		res.json({ accessToken: tokens.accessToken })
	}
}