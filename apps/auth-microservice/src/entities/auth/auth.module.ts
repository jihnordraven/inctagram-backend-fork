import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { CqrsModule } from '@nestjs/cqrs'
import { SessionModule } from '../session/session.module'
import { AuthRepository } from './repositories/auth.repository'
import { AuthQueryRepository } from './repositories/auth-query.repository'
import { AUTH_CONTROLLERS } from './controllers'
import { ADAPTERS } from '../../adapters'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [CqrsModule, UserModule, SessionModule],
	providers: [AuthService, AuthRepository, AuthQueryRepository, ...ADAPTERS],
	controllers: [...AUTH_CONTROLLERS],
	exports: [AuthService]
})
export class AuthModule {}
