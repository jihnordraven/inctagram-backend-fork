import { Body, Controller, Get, Ip, Post, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGurad } from '../protection/guards'
import { Request, Response } from 'express'
import { CONFIG } from 'src/config'
import { GoogleRegisterDTO } from '../core/dtos/google-register.dto'
import { AuthService } from '../auth.service'
import { UserAgent } from 'src/decorators'
import { TokensType } from '../application/commands/handlers'
import { JwtEnum } from 'src/helpers/enums'

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
		return this.setTokensToResponse({ tokens, res })
	}

	// helpers
	private async setTokensToResponse(data: { tokens: TokensType; res: Response }) {
		data.res.cookie(JwtEnum.REFRESH_TOKEN, data.tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: new Date(Number(CONFIG.JWT_REFRESH_EXPIRES))
		})
		data.res.json({ accessToken: data.tokens.accessToken })
	}
}
