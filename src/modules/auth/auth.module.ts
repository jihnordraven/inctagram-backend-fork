import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './application/auth.service'
import { CqrsModule } from '@nestjs/cqrs'
import { SessionModule } from '../session/session.module'
import { MailerAdapter } from 'src/adapters'
import { Argon2Adapter } from 'src/adapters/argon2.adapter'
import { AuthRepository } from './repositories/auth.repository'
import { AuthQueryRepository } from './repositories/auth-query.repository'

const adapters = [MailerAdapter, Argon2Adapter]

@Module({
	imports: [CqrsModule, UserModule, SessionModule],
	providers: [AuthService, AuthRepository, AuthQueryRepository, ...adapters],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
