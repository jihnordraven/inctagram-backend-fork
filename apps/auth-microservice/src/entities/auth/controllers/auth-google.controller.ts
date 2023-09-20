import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Ip,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { GoogleGurad } from '../guards-handlers/guards'
import { Request, Response } from 'express'
import { GoogleRegisterDTO } from '../core/dtos/google-register.dto'
import { AuthService } from '../auth.service'
import { TokensType } from '../application/commands/handlers'
import { Public, UserAgent } from '../../../decorators'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { CONFIG } from '../../../../../../libs/common/src/config'
import { TokensEnum } from '../../../../helpers/enums'
import {
	SwaggerGoogleRegisterType,
	SwaggerGoogleType
} from '../../../../libs/static/swagger/types/auth'

@Public()
@ApiTags('Google oAuth')
@Controller('auth/google')
export class AuthGoogleController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@SwaggerGoogleType()
	@UseGuards(GoogleGurad)
	public google(): void {}

	@Get('callback')
	@UseGuards(GoogleGurad)
	@ApiExcludeEndpoint()
	public googleCallback(@Req() req: Request, @Res() res: Response): void {
		// @ts-ignore
		const accessToken: string = req.user.accessToken
		console.log(accessToken)
		res.redirect(`${CONFIG.FRONTEND_HOST}/auth/google?accessToken=${accessToken}`)
	}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	@SwaggerGoogleRegisterType()
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
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: new Date(Number(CONFIG.JWT_REFRESH_EXPIRES))
		})
		res.json({ accessToken: tokens.accessToken })
	}
}
