import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ConfirmEmailCommand } from '../impl'
import { EmailCode, User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { AuthRepository } from '../../../repositories/auth.repository'
import { UsersService } from '../../../../users/users.service'
import { UsersRepository } from '../../../../users/users.reposiroty'

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	private FRONTEND_HOST: string = this.config.get<string>('FRONTEND_HOST')

	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly usersRepository: UsersRepository,
		protected readonly usersService: UsersService,
		protected readonly config: ConfigService
	) {}

	public async execute({ dto: { code, res } }: ConfirmEmailCommand): Promise<void> {
		const isCode: EmailCode = await this.authRepository.findEmailCodeByCode({
			code
		})
		if (!isCode) res.redirect(`${this.FRONTEND_HOST}/auth`)

		if (isCode.isUsed) res.redirect(`${this.FRONTEND_HOST}`)

		await this.authRepository.deactivateEmailCodeByCode({ code })

		const isCodeExpired: boolean = Boolean(new Date(isCode.expiresIn) < new Date())
		if (isCodeExpired) {
			res.redirect(`${this.FRONTEND_HOST}/auth/expired?code=${code}`)
		}

		await this.usersRepository.confirmUser({ userID: isCode.userID })
		await this.usersService.cancelScheduledDeletion({ userID: isCode.userID })

		const user: User = await this.usersRepository.findUserById({
			userID: isCode.userID
		})

		await this.usersRepository.createProfile({
			username: user.login,
			userID: user.id
		})

		res.redirect(`${this.FRONTEND_HOST}/auth/confirmed`)
	}
}
