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
import { add } from 'date-fns'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

import {
	JwtAccessPayloadDecorator,
	JwtRefreshPayloadDecorator,
	LocalAuthPayload,
	Public,
	UserAgent
} from '../../../../utils/decorators'
import { TokensEnum } from '../../../../utils/enums'
import { AUTH_COMMAND_IMPLS } from '../application/commands/impl'
import { AUTH_SWAGGER } from '../../../../static/swagger/types/auth'

import { TokensType } from '../application/commands/handlers'
import { LocalAuthGuard } from '../guards-handlers/guards'
import { JwtRefreshGuard } from '../guards-handlers/guards/jwt-refresh.guard'
import { JwtAccessPayload, JwtRefreshPayload } from '../guards-handlers/strategies'
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

	@Public()
	@Post('registration')
	@HttpCode(HttpStatus.NO_CONTENT)
	@AUTH_SWAGGER.SwaggerLocalRegisterType()
	public async registration(@Body() dto: RegistrationDTO): Promise<void> {
		await this.commandBus.execute(new AUTH_COMMAND_IMPLS.LocalRegisterCommand(dto))
	}

	@Public()
	@Post('resend-code')
	@HttpCode(HttpStatus.NO_CONTENT)
	@AUTH_SWAGGER.SwaggerEmailResendType()
	public async registrationEmailResending(
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(new AUTH_COMMAND_IMPLS.ResendCodeCommand({ code }))
	}

	@Public()
	@Get('registration-confirmation')
	@HttpCode(HttpStatus.NO_CONTENT)
	@AUTH_SWAGGER.SwaggerEmailConfirmType()
	public async registrationConfirmation(
		@Res() res: Response,
		@Query('code', ParseUUIDPipe) code: string
	): Promise<void> {
		await this.commandBus.execute(
			new AUTH_COMMAND_IMPLS.ConfirmEmailCommand({ res, code })
		)
	}

	@Public()
	@Post('password-recovery')
	@HttpCode(HttpStatus.NO_CONTENT)
	@AUTH_SWAGGER.SwaggerPasswordRecoveryType()
	public async passwordRecovery(@Body() dto: PasswordRecoveryDTO): Promise<void> {
		await this.commandBus.execute(new AUTH_COMMAND_IMPLS.PasswordRecoveryCommand(dto))
	}

	@Public()
	@Post('new-password')
	@HttpCode(HttpStatus.NO_CONTENT)
	@AUTH_SWAGGER.SwaggerNewPasswordType()
	public async newPassword(
		@Query('code', ParseUUIDPipe) code: string,
		@Body() dto: NewPasswordDTO,
		@Res() res: Response
	): Promise<void> {
		await this.commandBus.execute(
			new AUTH_COMMAND_IMPLS.NewPasswordCommand({
				res,
				code,
				newPassword: dto.newPassword
			})
		)
	}

	@Public()
	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@AUTH_SWAGGER.SwaggerLoginType()
	public async login(
		@LocalAuthPayload('id', ParseUUIDPipe) userID: string,
		@Ip() userIP: string,
		@UserAgent() userAgent: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensType = await this.commandBus.execute(
			new AUTH_COMMAND_IMPLS.GenerateTokensCommand({ userID, userAgent, userIP })
		)
		await this.setTokensToResponse(tokens, res)
	}

	@Public()
	@Post('new-tokens')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	@AUTH_SWAGGER.SwaggerNewTokensType()
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
	@AUTH_SWAGGER.SwaggerLogoutType()
	public async logout(
		@JwtRefreshPayloadDecorator() payload: JwtRefreshPayload,
		@Res() res: Response
	) {
		await this.commandBus.execute(new AUTH_COMMAND_IMPLS.LogoutCommand(payload))
		res.clearCookie(TokensEnum.REFRESH_TOKEN)
	}

	@Get('me')
	@HttpCode(HttpStatus.OK)
	@AUTH_SWAGGER.SwaggerMeType()
	public async getMe(
		@JwtAccessPayloadDecorator() { userID }: JwtAccessPayload
	): Promise<any> {
		return this.authQueryRepository.getMe({ userID })
	}

	// helpers
	private async setTokensToResponse(tokens: TokensType, res: Response): Promise<void> {
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			expires: add(new Date(), {
				seconds: this.config.get<number>('JWT_REFRESH_EXPIRES')
			})
		})
		res.json({ accessToken: tokens.accessToken })
	}
}
