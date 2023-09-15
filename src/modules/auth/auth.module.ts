import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './auth.service'
import { CqrsModule } from '@nestjs/cqrs'
import { SessionModule } from '../session/session.module'
import { MailerAdapter } from 'src/adapters'
import { Argon2Adapter } from 'src/adapters/argon2.adapter'
import { AuthRepository } from './repositories/auth.repository'
import { AuthQueryRepository } from './repositories/auth-query.repository'
import { AuthGoogleController } from './controllers/auth-google.controller'
import { AuthGithubController } from './controllers/auth-github.controller'

const adapters = [MailerAdapter, Argon2Adapter]

const controllers = [AuthController, AuthGoogleController, AuthGithubController]

@Module({
	imports: [CqrsModule, UserModule, SessionModule],
	providers: [AuthService, AuthRepository, AuthQueryRepository, ...adapters],
	controllers: [...controllers],
	exports: [AuthService]
})
export class AuthModule {}
