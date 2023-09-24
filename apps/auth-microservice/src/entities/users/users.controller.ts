import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	ParseFilePipe,
	ParseUUIDPipe,
	Patch,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EditProfileDTO } from './core/dtos'
import { CommandBus } from '@nestjs/cqrs'
import { USERS_COMMANDS_IMPLS } from './application/commands/impl'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAccessPayloadDecorator } from 'apps/auth-microservice/utils/decorators'

const AvatarValidationPipe = new ParseFilePipe({
	validators: [
		new MaxFileSizeValidator({ maxSize: 10000000 }),
		new FileTypeValidator({ fileType: 'image/*' })
	]
})

@ApiTags('Users endpoints')
@Controller('users')
export class UsersController {
	constructor(private readonly commandBus: CommandBus) {}

	@Patch('edit-avatar')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseInterceptors(FileInterceptor('avatar'))
	public async EditAvatar(
		@UploadedFile(AvatarValidationPipe) file: Express.Multer.File,
		@JwtAccessPayloadDecorator('userID', ParseUUIDPipe) userID: string
	): Promise<void> {
		await this.commandBus.execute(
			new USERS_COMMANDS_IMPLS.EditAvatarCommand({ file, userID })
		)
	}

	@Patch('edit-profile')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async EditProfile(
		@Body() dto: EditProfileDTO,
		@JwtAccessPayloadDecorator('userID', ParseUUIDPipe) userID: string
	): Promise<void> {
		await this.commandBus.execute(
			new USERS_COMMANDS_IMPLS.EditProfileCommand(dto, userID)
		)
	}
}
