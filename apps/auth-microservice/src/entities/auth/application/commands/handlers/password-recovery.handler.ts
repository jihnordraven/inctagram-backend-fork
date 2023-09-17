import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PasswordRecoveryCommand } from '../impl'
import { User } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'
import { AuthRepository } from '../../../repositories/auth.repository'
import { MailerAdapter } from '../../../../../adapters'
import { UsersRepository } from '../../../../users/users.reposiroty'

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler implements ICommandHandler<PasswordRecoveryCommand> {
	constructor(
		protected readonly usersRepository: UsersRepository,
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({ dto: { email } }: PasswordRecoveryCommand): Promise<void> {
		const user: User | null = await this.usersRepository.findUserByEmail({ email })
		if (!user) throw new NotFoundException('User not found')

		const code: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendEmailCode({ email: user.email, code })
	}
}
