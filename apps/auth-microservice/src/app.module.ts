import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './entities/auth/auth.module'
import { AuthService } from './entities/auth/auth.service'

import { ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import { ScheduleModule } from '@nestjs/schedule'
import { AuthRepository } from './entities/auth/repositories/auth.repository'
import { AuthQueryRepository } from './entities/auth/repositories/auth-query.repository'
import { STRATEGIES } from './entities/auth/guards-handlers/strategies'
import { JwtAccessGuard } from './entities/auth/guards-handlers/guards'
import { JwtModule } from '@nestjs/jwt'
import { MODULE_PROVIDERS } from './modules'
import { SessionsModule } from './entities/sessions/sessions.module'
import { UsersService } from './entities/users/users.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersRepository } from './entities/users/users.reposiroty'
import { SessionsRepository } from './entities/sessions/sessions.repository'
import { AUTH_COMMANDS_HANDLERS } from './entities/auth/application/commands/handlers'
import { AUTH_ADAPTERS } from './entities/auth/adapters'

const modules = [AuthModule, PrismaModule, SessionsModule, JwtModule]

const services = [AppService, AuthService, UsersService]

const repositories = [
	UsersRepository,
	AuthRepository,
	AuthQueryRepository,
	SessionsRepository
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
		...AUTH_COMMANDS_HANDLERS,
		...AUTH_ADAPTERS,
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
