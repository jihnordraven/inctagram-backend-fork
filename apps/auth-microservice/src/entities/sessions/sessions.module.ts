import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionsService } from './sessions.service'
import { SessionsRepository } from './sessions.repository'

@Module({
	controllers: [SessionController],
	providers: [SessionsService, SessionsRepository],
	exports: [SessionsService, SessionsRepository]
})
export class SessionsModule {}
