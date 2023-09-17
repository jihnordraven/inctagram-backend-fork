import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ConflictException } from '@nestjs/common'
import { User } from '@prisma/client'
import { MailerAdapter, Argon2Adapter } from '../../../../../adapters'
import { AuthRepository } from '../../../repositories/auth.repository'
import { LocalRegisterCommand } from '../impl'
import { UsersRepository } from '../../../../users/users.reposiroty'
import { UsersService } from '../../../../users/users.service'

@CommandHandler(LocalRegisterCommand)
export class LocalRegisterHandler implements ICommandHandler<LocalRegisterCommand> {
	constructor(
		protected readonly usersRepository: UsersRepository,
		protected readonly authRepository: AuthRepository,
		protected readonly argon2Adapter: Argon2Adapter,
		protected readonly mailerAdapter: MailerAdapter,
		protected readonly usersService: UsersService
	) {}

	async execute({ dto }: LocalRegisterCommand): Promise<void> {
		const isUser: User | null = await this.usersRepository.findUserByEmail({
			email: dto.email
		})
		if (isUser && !isUser.isConfirmed) {
			const code: string = await this.authRepository.createEmailCode({
				userID: isUser.id
			})
			await this.authRepository.deactivateAllEmailCodesByUserID({
				userID: isUser.id
			})
			await this.mailerAdapter.sendEmailCode({ email: isUser.email, code })
			return
		}
		if (isUser)
			throw new ConflictException({
				message: 'User with this email is already registered',
				field: 'email',
				context: 'email-conflict',
				statusCode: 409
			})

		const isLoginTaken: User | null = await this.usersRepository.findUserByLogin({
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

		const user: User = await this.usersRepository.createUser({
			email: dto.email,
			login: dto.login,
			hashPassword
		})

		const code: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendEmailCode({ email: dto.email, code })

		this.usersService.createScheduledDeletion({ userID: user.id })
	}
}
