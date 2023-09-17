import { Body, Controller, Get, Ip, Post, Res, UseGuards } from '@nestjs/common'
import { TokensType } from '../application/commands/handlers'
import { Response } from 'express'
import { AuthService } from '../auth.service'
import { Github2Guard } from '../guards-handlers/guards/github2.guard'
import { GithubRegisterDTO } from '../core/dtos'
import { Public, UserAgent } from '../../../decorators'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { CONFIG } from '../../../../config'
import { TokensEnum } from '../../../../helpers/enums'

@Public()
@ApiTags('Github oAuth')
@Controller('auth/github')
export class AuthGithubController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@UseGuards(Github2Guard)
	public github(): void {}

	@Get('callback')
	@UseGuards(Github2Guard)
	@ApiExcludeEndpoint()
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
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: new Date(Number(CONFIG.JWT_REFRESH_EXPIRES))
		})
		res.json({ accessToken: tokens.accessToken })
	}
}
