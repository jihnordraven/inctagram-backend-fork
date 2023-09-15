import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserService } from './entities/user/user.service'
import { AuthModule } from './entities/auth/auth.module'
import { AuthService } from './entities/auth/auth.service'

import { ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import { ScheduleModule } from '@nestjs/schedule'
import { UserRepository } from './entities/user/user.reposiroty'
import { PrismaModule } from 'apps/auth-microservice/prisma/prisma.module'
import {
	ConfirmEmailHandler,
	GenerateTokensHandler,
	LocalRegisterHandler,
	LogoutHandler,
	NewPasswordHandler,
	PasswordRecoveryHandler,
	ResendConfirmEmailHandler
} from './entities/auth/application/commands/handlers'
import { AuthRepository } from './entities/auth/repositories/auth.repository'
import { SessionModule } from './entities/session/session.module'
import { AuthQueryRepository } from './entities/auth/repositories/auth-query.repository'
import { SessionRepository } from './entities/session/session.repository'
import { STRATEGIES } from './entities/auth/guards-handlers/strategies'
import { JwtAccessGuard } from './entities/auth/guards-handlers/guards'
import { ADAPTERS } from './adapters'
import { JwtModule } from '@nestjs/jwt'
import { MODULE_PROVIDERS } from './modules'

const modules = [AuthModule, PrismaModule, SessionModule, JwtModule]

const services = [AppService, AuthService, UserService]

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

@Module({
	imports: [
		CqrsModule,
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
		...MODULE_PROVIDERS,
		...modules
	],
	controllers: [AppController],
	providers: [
		...services,
		...repositories,
		...authCommandHandlers,
		...ADAPTERS,
		...STRATEGIES,
		{
			provide: APP_GUARD,
			useClass: JwtAccessGuard
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
