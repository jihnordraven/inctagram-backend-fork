import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ConfirmEmailCommand } from '../impl'
import { EmailCode } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../../../../user/user.service'
import { UserRepository } from '../../../../user/user.reposiroty'
import { AuthRepository } from '../../../repositories/auth.repository'

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	private FRONTEND_HOST: string = this.config.get<string>('FRONTEND_HOST')

	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly userRepository: UserRepository,
		protected readonly userService: UserService,
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

		await this.userRepository.confirmUser({ userID: isCode.userID })
		await this.userService.cancelScheduledDeletion({ userID: isCode.userID })

		res.redirect(`${this.FRONTEND_HOST}/auth/confirmed`)
	}
}
