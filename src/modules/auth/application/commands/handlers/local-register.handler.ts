import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from '../../../../user/user.reposiroty'
import { ConflictException } from '@nestjs/common'
import { User } from '@prisma/client'
import { MailerAdapter, Argon2Adapter } from '../../../../../adapters'
import { AuthRepository } from '../../../../auth/repositories/auth.repository'
import { LocalRegisterCommand } from '../impl'
import { UserService } from '../../../../../modules/user/user.service'

@CommandHandler(LocalRegisterCommand)
export class LocalRegisterHandler implements ICommandHandler<LocalRegisterCommand> {
	constructor(
		protected readonly userRepository: UserRepository,
		protected readonly authRepository: AuthRepository,
		protected readonly argon2Adapter: Argon2Adapter,
		protected readonly mailerAdapter: MailerAdapter,
		protected readonly userService: UserService
	) {}

	async execute({ dto }: LocalRegisterCommand): Promise<void> {
		const isUser: User | null = await this.userRepository.findUserByEmail({
			email: dto.email
		})
		if (isUser && !isUser.isConfirmed) {
			const code: string = await this.authRepository.createEmailCode({
				userID: isUser.id
			})
			await this.mailerAdapter.sendEmailCode({ email: isUser.email, code })
		}
		if (isUser)
			throw new ConflictException({
				message: 'User with this email is already registered',
				field: 'email',
				context: 'email-conflict',
				statusCode: 409
			})

		const isLoginTaken: boolean = await this.userRepository.checkIsUniqueLogin({
			login: dto.login
		})
		if (isLoginTaken)
			throw new ConflictException({
				message: 'User with this username is already registered',
				field: 'login',
				context: 'login-conflict',
				statusCode: 409
			})

		const hashPassword: string = await this.argon2Adapter.hash({
			password: dto.password
		})

		const user: User = await this.userRepository.createUser({
			email: dto.email,
			login: dto.login,
			hashPassword
		})

		const code: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendEmailCode({ email: dto.email, code })

		this.userService.createScheduledDeletion({ userID: user.id })
	}
}
