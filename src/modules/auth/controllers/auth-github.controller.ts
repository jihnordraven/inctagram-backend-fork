import { Body, Controller, Get, Ip, Post, Res, UseGuards } from '@nestjs/common'
import { TokensType } from '../application/commands/handlers'
import { Response } from 'express'
import { JwtEnum } from 'src/helpers/enums'
import { CONFIG } from 'src/config'
import { AuthService } from '../auth.service'
import { Github2Guard } from '../protection/guards/github2.guard'
import { GithubRegisterDTO } from '../core/dtos'
import { UserAgent } from 'src/decorators'

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
