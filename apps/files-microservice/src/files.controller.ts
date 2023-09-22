import { EventPattern, MessagePattern } from '@nestjs/microservices'
import { Controller, Get, Logger } from '@nestjs/common'
import { UploadAvatarType } from './types'
import { FilesService } from './files.service'

@Controller()
export class FilesController {
	private readonly logger: Logger = new Logger(FilesController.name)

	constructor(private readonly filesService: FilesService) {}

	@Get()
	public getHello() {
		this.logger.log('handle')
		return 'Microservice works'
	}

	@EventPattern('upload-avatar')
	public async message(data: UploadAvatarType): Promise<void> {
		this.logger.log('handle upload avatar')
		await this.filesService.uploadAvatar(data)
	}
}
