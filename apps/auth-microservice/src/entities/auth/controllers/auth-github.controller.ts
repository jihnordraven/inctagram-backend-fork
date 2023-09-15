import { Body, Controller, Get, Ip, Post, Res, UseGuards } from '@nestjs/common'
import { TokensType } from '../application/commands/handlers'
import { Response } from 'express'
import { AuthService } from '../auth.service'
import { Github2Guard } from '../guards-handlers/guards/github2.guard'
import { GithubRegisterDTO } from '../core/dtos'
import { UserAgent } from 'apps/auth-microservice/src/decorators'
import { JwtEnum } from 'helpers/enums'
import { CONFIG } from 'apps/auth-microservice/config'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Github oAuth')
@Controller('auth/github')
export class AuthGithubController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@UseGuards(Github2Guard)
	public github(): void {}

	@Get('callback')
	@UseGuards(Github2Guard)
	public githubCallback(): void {}

	@Post('register')
	public async githubRegister(
		@Body() dto: GithubRegisterDTO,
		@UserAgent() userAgent: string,
		@Ip() userIP: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensType = await this.authService.githubRegister(
			dto,
			{ userIP, userAgent },
			res
		)
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