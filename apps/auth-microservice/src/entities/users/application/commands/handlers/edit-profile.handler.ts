import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EditProfileCommand } from '../impl/edit-profile.command'
import { UsersRepository } from '../../../users.reposiroty'
import { User } from '@prisma/client'
import { BadRequestException, NotFoundException } from '@nestjs/common'

@CommandHandler(EditProfileCommand)
export class EditProfileHandler implements ICommandHandler<EditProfileCommand> {
	constructor(protected readonly usersRepository: UsersRepository) {}

	public async execute({ dto, userID }: EditProfileCommand): Promise<void> {
		const user: User | null = await this.usersRepository.findUserById({ userID })
		if (!user) throw new NotFoundException('User not found')

		const isSuccess = await this.usersRepository.editProfile(dto, user.id)
		if (!isSuccess) throw new BadRequestException('Unable to edit profle')

		return
	}
}
