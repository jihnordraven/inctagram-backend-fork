import { EventPattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { UploadAvatarType } from './types'
import { FilesService } from './files.service'

@Controller()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@EventPattern('upload-avatar')
	public async message(data: UploadAvatarType): Promise<void> {
		await this.filesService.uploadAvatar(data)
	}
}
