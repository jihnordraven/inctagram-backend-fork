import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GithubRegisterCommand } from '../impl'
import { GithubProfile, User } from '@prisma/client'
import { AuthService } from '../../../auth.service'
import { AuthRepository } from '../../../repositories/auth.repository'
import { BadRequestException } from '@nestjs/common'
import { UsersRepository } from '../../../../users/users.reposiroty'
import { CONFIG } from '../../../../../../../../libs/common/src/config'

@CommandHandler(GithubRegisterCommand)
export class GithubRegisterHandler implements ICommandHandler<GithubRegisterCommand> {
	constructor(
		private readonly authRepository: AuthRepository,
		protected readonly usersRepository: UsersRepository,
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

		const isUser: User | null = await this.usersRepository.findUserByEmail({
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

			const newUser: User = await this.usersRepository.createUser({
				email: dto.email,
				login: uniqueUsername
			})

			return this.authRepository.createGithubProfile(dto, { userID: newUser.id })
		}
	}
}
