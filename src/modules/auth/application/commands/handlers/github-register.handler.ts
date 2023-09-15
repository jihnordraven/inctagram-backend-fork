import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GithubRegisterCommand } from '../impl'
import { GithubProfile, User } from '@prisma/client'
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository'
import { CONFIG } from 'src/config'
import { BadRequestException } from '@nestjs/common'
import { UserRepository } from 'src/modules/user/user.reposiroty'
import { AuthService } from '../../../auth.service'

@CommandHandler(GithubRegisterCommand)
export class GithubRegisterHandler implements ICommandHandler<GithubRegisterCommand> {
	constructor(
		private readonly authRepository: AuthRepository,
		protected readonly userRepository: UserRepository,
		protected readonly authService: AuthService
	) {}

	public async execute({ dto, res }: GithubRegisterCommand): Promise<GithubProfile> {
		if (!dto.email) {
			res.redirect(`${CONFIG.FRONTEND_HOST}/auth`)
			throw new BadRequestException("Your github account doesn't share email")
		}

		const isGithubProfile: GithubProfile | null =
			await this.authRepository.findGithubProfileByProviderID({
				providerID: dto.node_id
			})

		if (isGithubProfile) return isGithubProfile

		const isUser: User | null = await this.userRepository.findUserByEmail({
			email: dto.email
		})

		if (isUser) {
			const isGithubProfile: GithubProfile | null =
				await this.authRepository.findGithubProfileByUserID({ userID: isUser.id })
			if (isGithubProfile) {
				return isGithubProfile
			} else {
				return this.authRepository.createGithubProfile(dto, { userID: isUser.id })
			}
		} else {
			const uniqueUsername: string = await this.authService.genUniqueUsername({
				prefix: 'github'
			})

			const newUser: User = await this.userRepository.createUser({
				email: dto.email,
				login: uniqueUsername
			})

			return this.authRepository.createGithubProfile(dto, { userID: newUser.id })
		}
	}
}
