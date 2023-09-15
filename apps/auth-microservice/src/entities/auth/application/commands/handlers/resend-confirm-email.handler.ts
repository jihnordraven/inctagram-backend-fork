import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ResendConfirmEmailCommand } from '../impl'
import { EmailCode, User } from '@prisma/client'
import { AuthRepository } from '../../../repositories/auth.repository'
import { NotFoundException } from '@nestjs/common'
import { MailerAdapter } from '../../../../../adapters'
import { UserRepository } from '../../../../user/user.reposiroty'

@CommandHandler(ResendConfirmEmailCommand)
export class ResendConfirmEmailHandler
	implements ICommandHandler<ResendConfirmEmailCommand>
{
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly userRepository: UserRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({ dto: { code } }: ResendConfirmEmailCommand): Promise<void> {
		const isCode: EmailCode | null = await this.authRepository.findEmailCodeByCode({
			code
		})
		if (!isCode) throw new NotFoundException('Invalid code')

		const user: User = await this.userRepository.findUserById({
			userID: isCode.userID
		})
		if (!user) throw new NotFoundException('User not found')

		await this.authRepository.deactivateEmailCodeByCode({ code })

		const newEmailCode: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendEmailCode({ email: user.email, code: newEmailCode })
	}
}
