import { EventPattern } from '@nestjs/microservices'
import { Controller, Get } from '@nestjs/common'
import { UploadAvatarType } from './types'
import { FilesService } from './files.service'

@Controller()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get()
	public getHello() {
		return 'Microservice works'
	}

	@EventPattern('upload-avatar')
	public async message(data: UploadAvatarType): Promise<void> {
		await this.filesService.uploadAvatar(data)
	}
}
