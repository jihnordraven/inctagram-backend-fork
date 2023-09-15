import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	Query,
	UseGuards,
	Ip,
	Get,
	ParseUUIDPipe
} from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import {
	ConfirmEmailCommand,
	GenerateTokensCommand,
	LocalRegisterCommand,
	LogoutCommand,
	NewPasswordCommand,
	PasswordRecoveryCommand,
	ResendConfirmEmailCommand
} from '../application/commands/impl'
import { ApiTags } from '@nestjs/swagger'
import { TokensType } from '../application/commands/handlers'
import { JwtAccessGuard, LocalGuard } from '../protection/guards'
import {
	JwtAccessPayloadDecorator,
	JwtRefreshPayloadDecorator,
	LocalAuthPayload,
	UserAgent
} from '../../../decorators'
import { JwtEnum } from 'src/helpers/enums'
import { ConfigService } from '@nestjs/config'
import { add } from 'date-fns'
import { JwtRefreshGuard } from '../protection/guards/jwt-refresh.guard'
import { JwtAccessPayload, JwtRefreshPayload } from '../protection/strategies'
import { AuthService } from '../auth.service'
import { AuthQueryRepository } from '../repositories/auth-query.repository'
import { RegistrationDTO } from '../core/dtos/registration.dto'
import { NewPasswordDTO, PasswordRecoveryDTO } from '../core/dtos'

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly config: ConfigService,
		private readonly commandBus: CommandBus,
		private readonly authService: AuthService,
		private readonly authQueryRepository: AuthQueryRepository
	) {}

	@Post('registration')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async registration(@Body() dto: RegistrationDTO): Promise<void> {
		await this.commandBus.execute(new LocalRegisterCommand(dto))
	}

	@Post('registration-email-resending')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async registrationEmailResending(
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(new ResendConfirmEmailCommand({ code }))
	}

	@Get('registration-confirmation')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async registrationConfirmation(
		@Res() res: Response,
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(new ConfirmEmailCommand({ res, code }))
	}

	@Post('password-recovery')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async passwordRecovery(@Body() dto: PasswordRecoveryDTO): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryCommand(dto))
	}

	@Post('new-password')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async newPassword(
		@Query('code', ParseUUIDPipe) code: string,
		@Body() dto: NewPasswordDTO,
		@Res() res: Response
	): Promise<void> {
		await this.commandBus.execute(
			new NewPasswordCommand({ res, code, newPassword: dto.newPassword })
		)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalGuard)
	public async login(
		@LocalAuthPayload('id', ParseUUIDPipe) userID: string,
		@Ip() userIP: string,
		@UserAgent() userAgent: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensType = await this.commandBus.execute(
			new GenerateTokensCommand({ userID, userAgent, userIP })
		)
		await this.setTokensToResponse(tokens, res)
	}

	@Post('new-tokens')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	public async newTokens(
		@JwtRefreshPayloadDecorator() payload: JwtRefreshPayload,
		@UserAgent() userAgent: string,
		@Ip() userIP: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensType = await this.authService.newTokens(payload, {
			userIP,
			userAgent
		})
		return this.setTokensToResponse(tokens, res)
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtRefreshGuard)
	public async logout(
		@JwtRefreshPayloadDecorator() payload: JwtRefreshPayload,
		@Res() res: Response
	) {
		await this.commandBus.execute(new LogoutCommand(payload))
		res.clearCookie(JwtEnum.REFRESH_TOKEN)
	}

	@Get('me')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAccessGuard)
	async getMe(@JwtAccessPayloadDecorator() { userID }: JwtAccessPayload) {
		return this.authQueryRepository.getMe({ userID })
	}

	// helpers
	private async setTokensToResponse(tokens: TokensType, res: Response): Promise<void> {
		res.cookie(JwtEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			expires: add(new Date(), {
				seconds: this.config.get<number>('JWT_REFRESH_EXPIRES')
			})
		})
		res.json({ accessToken: tokens.accessToken })
	}
}
