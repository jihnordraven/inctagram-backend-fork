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
import { LocalGuard } from '../guards-handlers/guards'
import {
	JwtAccessPayloadDecorator,
	JwtRefreshPayloadDecorator,
	LocalAuthPayload,
	Public,
	UserAgent
} from '../../../decorators'
import { ConfigService } from '@nestjs/config'
import { add } from 'date-fns'
import { JwtRefreshGuard } from '../guards-handlers/guards/jwt-refresh.guard'
import { JwtAccessPayload, JwtRefreshPayload } from '../guards-handlers/strategies'
import { AuthService } from '../auth.service'
import { AuthQueryRepository } from '../repositories/auth-query.repository'
import { RegistrationDTO } from '../core/dtos/registration.dto'
import { NewPasswordDTO, PasswordRecoveryDTO } from '../core/dtos'
import { JwtEnum } from 'helpers/enums'
import { SwaggerRegistrationType } from '../../../../swagger/types/auth/swagger-registration.type.type'

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly config: ConfigService,
		private readonly commandBus: CommandBus,
		private readonly authService: AuthService,
		private readonly authQueryRepository: AuthQueryRepository
	) {}

	@Public()
	@Post('registration')
	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerRegistrationType()
	public async registration(@Body() dto: RegistrationDTO): Promise<void> {
		await this.commandBus.execute(new LocalRegisterCommand(dto))
	}

	@Public()
	@Post('registration-email-resending')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async registrationEmailResending(
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(new ResendConfirmEmailCommand({ code }))
	}

	@Public()
	@Get('registration-confirmation')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async registrationConfirmation(
		@Res() res: Response,
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(new ConfirmEmailCommand({ res, code }))
	}

	@Public()
	@Post('password-recovery')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async passwordRecovery(@Body() dto: PasswordRecoveryDTO): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryCommand(dto))
	}

	@Public()
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

	@Public()
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

	@Public()
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

	@Public()
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
	public async getMe(
		@JwtAccessPayloadDecorator() { userID }: JwtAccessPayload
	): Promise<any> {
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
