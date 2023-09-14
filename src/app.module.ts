import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserService } from './modules/user/user.service'
import { AuthModule } from './modules/auth/auth.module'
import { JwtService } from '@nestjs/jwt'
import { AuthController } from './modules/auth/auth.controller'
import { AuthService } from './modules/auth/application/auth.service'
import { MailerAdapter } from './adapters/mailer.adapter'

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import { ScheduleModule } from '@nestjs/schedule'
import { UserRepository } from './modules/user/user.reposiroty'
import { TestingService } from './testing/testing.service'
import { TestingController } from './testing/testing.controller'
import { PrismaModule } from 'prisma/prisma.module'
import {
	ConfirmEmailHandler,
	GenerateTokensHandler,
	LocalRegisterHandler,
	LogoutHandler,
	NewPasswordHandler,
	PasswordRecoveryHandler,
	ResendConfirmEmailHandler
} from './modules/auth/application/commands/handlers'
import { AuthRepository } from './modules/auth/repositories/auth.repository'
import { Argon2Adapter } from './adapters/argon2.adapter'
import { SessionModule } from './modules/session/session.module'
import { AuthQueryRepository } from './modules/auth/repositories/auth-query.repository'
import { SessionRepository } from './modules/session/session.repository'
import { STRATEGIES } from './modules/auth/protection/strategies'

const modules = [AuthModule, PrismaModule, SessionModule]

const services = [AppService, UserService, AuthService, JwtService, TestingService]

const repositories = [
	UserRepository,
	AuthRepository,
	AuthQueryRepository,
	SessionRepository
]

const authCommandHandlers = [
	LocalRegisterHandler,
	ConfirmEmailHandler,
	ResendConfirmEmailHandler,
	PasswordRecoveryHandler,
	NewPasswordHandler,
	GenerateTokensHandler,
	LogoutHandler
]

const adapters = [MailerAdapter, Argon2Adapter]

@Module({
	imports: [
		CqrsModule,
		ThrottlerModule.forRoot({
			ttl: 10,
			limit: 500
		}),
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
		...modules
	],

	controllers: [AppController, AuthController, TestingController],

	providers: [
		...services,
		...repositories,
		...authCommandHandlers,
		...adapters,
		...STRATEGIES,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
