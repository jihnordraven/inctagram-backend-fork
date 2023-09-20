import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EditAvatarCommand } from '../impl'
import { UsersRepository } from '../../../users.reposiroty'
import { aws_base_url } from '../../../../../../../../libs/common/src/aws/constants'
import { User } from '@prisma/client'
import { Inject, NotFoundException } from '@nestjs/common'
import { v4 } from 'uuid'
import { ClientProxy } from '@nestjs/microservices'

@CommandHandler(EditAvatarCommand)
export class EditAvatarHandler implements ICommandHandler<EditAvatarCommand> {
	constructor(
		protected readonly usersRepository: UsersRepository,
		@Inject('MAIN') private readonly filesClient: ClientProxy
	) {}

	public async execute({ dto }: EditAvatarCommand): Promise<void> {
		const user: User | null = await this.usersRepository.findUserById({
			userID: dto.userID
		})
		if (!user) throw new NotFoundException('User not found')

		const filename: string = v4()

		this.filesClient.emit('upload-avatar', {
			filename,
			buffer: dto.file.buffer
		})

		const avatarUrl: string = `${aws_base_url}/${filename}`
		await this.usersRepository.editAvatar({ avatarUrl, userID: user.id })
	}
}
