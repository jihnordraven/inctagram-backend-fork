import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserService } from './entities/user/user.service'
import { AuthModule } from './entities/auth/auth.module'
import { JwtService } from '@nestjs/jwt'
import { AuthController } from './entities/auth/controllers/auth.controller'
import { AuthService } from './entities/auth/auth.service'
import { MailerAdapter } from './adapters/mailer.adapter'

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import { ScheduleModule } from '@nestjs/schedule'
import { UserRepository } from './entities/user/user.reposiroty'
import { TestingService } from './testing/testing.service'
import { TestingController } from './testing/testing.controller'
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
import { Argon2Adapter } from './adapters/argon2.adapter'
import { SessionModule } from './entities/session/session.module'
import { AuthQueryRepository } from './entities/auth/repositories/auth-query.repository'
import { SessionRepository } from './entities/session/session.repository'
import { STRATEGIES } from './entities/auth/guards-handlers/strategies'
import { JwtAccessGuard } from './entities/auth/guards-handlers/guards'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

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
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async () => ({
				store: await redisStore({
					password: 'kGGgSmP4zd4xTfwtamGh3HkRQ6nz7kEf',
					socket: {
						host: 'redis-13434.c293.eu-central-1-1.ec2.cloud.redislabs.com',
						port: 13434
					}
				})
			})
		}),
		...modules
	],
	controllers: [AppController, TestingController],
	providers: [
		...services,
		...repositories,
		...authCommandHandlers,
		...adapters,
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
