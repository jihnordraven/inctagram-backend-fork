import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { SessionRepository } from './session.repository'
import { ConfigModule } from '@nestjs/config'

@Module({
	controllers: [SessionController],
	providers: [SessionService, SessionRepository],
	exports: [SessionRepository]
})
export class SessionModule {}
