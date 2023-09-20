import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersRepository } from './users.reposiroty'
import { CqrsModule } from '@nestjs/cqrs'
import { USERS_COMMANDS_HANDLERS } from './application/commands/handlers'
import { UsersController } from './users.controller'
import { RmqModule } from '../../../../../libs/common/src/rmq/rmq.module'

@Module({
	imports: [CqrsModule, RmqModule.register({ name: 'MAIN' })],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, ...USERS_COMMANDS_HANDLERS],
	exports: [UsersService, UsersRepository]
})
export class UsersModule {}
