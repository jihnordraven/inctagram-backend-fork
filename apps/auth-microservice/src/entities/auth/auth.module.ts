import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthRepository } from './repositories/auth.repository'
import { AuthQueryRepository } from './repositories/auth-query.repository'
import { AUTH_CONTROLLERS } from './controllers'
import { ADAPTERS } from '../../adapters'
import { UsersModule } from '../users/users.module'
import { SessionsModule } from '../sessions/sessions.module'

@Module({
	imports: [CqrsModule, UsersModule, SessionsModule],
	providers: [AuthService, AuthRepository, AuthQueryRepository, ...ADAPTERS],
	controllers: [...AUTH_CONTROLLERS],
	exports: [AuthService]
})
export class AuthModule {}
