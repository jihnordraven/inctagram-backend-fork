import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GoogleRegisterCommand } from '../impl'
import { GoogleProfile, User } from '@prisma/client'
import { AuthService } from '../../../auth.service'
import { AuthRepository } from '../../../repositories/auth.repository'
import { UsersRepository } from '../../../../users/users.reposiroty'

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler implements ICommandHandler<GoogleRegisterCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly usersRepository: UsersRepository,
		protected readonly authService: AuthService
	) {}

	public async execute({ dto }: GoogleRegisterCommand): Promise<any> {
		const isGoogleProfile: GoogleProfile | null =
			await this.authRepository.findGoogleProfileByProviderID({
				providerID: dto.sub
			})

		if (isGoogleProfile) return isGoogleProfile

		const isUser: User | null = await this.usersRepository.findUserByEmail({
			email: dto.email
		})

		if (isUser) {
			const googleProfile: GoogleProfile | null =
				await this.authRepository.findGoogleProfileByUserID({ userID: isUser.id })

			if (googleProfile) return googleProfile

			return this.authRepository.createGoogleProfile(dto, { userID: isUser.id })
		} else {
			const uniqueUsername: string = await this.authService.genUniqueUsername({
				prefix: 'google'
			})
			const newUser: User = await this.usersRepository.createUser({
				email: dto.email,
				login: uniqueUsername,
				isConfirmed: true
			})
			return this.authRepository.createGoogleProfile(dto, { userID: newUser.id })
		}
	}
}
