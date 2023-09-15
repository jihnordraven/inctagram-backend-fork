import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GoogleRegisterCommand } from '../impl'
import { GoogleProfile, User } from '@prisma/client'
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository'
import { UserRepository } from 'src/modules/user/user.reposiroty'
import { AuthService } from '../../../auth.service'

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler implements ICommandHandler<GoogleRegisterCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly userRepository: UserRepository,
		protected readonly authService: AuthService
	) {}

	public async execute({ dto }: GoogleRegisterCommand): Promise<any> {
		const isGoogleProfile: GoogleProfile | null =
			await this.authRepository.findGoogleProfileByProviderID({
				providerID: dto.sub
			})

		if (isGoogleProfile) return isGoogleProfile

		const isUser: User | null = await this.userRepository.findUserByEmail({
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
			const newUser: User = await this.userRepository.createUser({
				email: dto.email,
				login: uniqueUsername
			})
			return this.authRepository.createGoogleProfile(dto, { userID: newUser.id })
		}
	}
}
