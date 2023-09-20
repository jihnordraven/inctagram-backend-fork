import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { RmqModule } from '../../../libs/common/src/rmq/rmq.module'
import { ConfigModule } from '@nestjs/config'
import { FilesService } from './files.service'

@Module({
	imports: [RmqModule, ConfigModule.forRoot({ isGlobal: true })],
	controllers: [FilesController],
	providers: [FilesService]
})
export class FilesModule {}
