import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserRepository } from '../user/user.reposiroty'
import { ValidateUserType } from './protection/strategies/local.strategy'
import { GithubProfile, GoogleProfile, User } from '@prisma/client'
import { Argon2Adapter } from 'src/adapters/argon2.adapter'
import { JwtRefreshPayload } from './protection/strategies'
import { CommandBus } from '@nestjs/cqrs'
import {
	GenerateTokensCommand,
	GithubRegisterCommand,
	GoogleRegisterCommand,
	LogoutCommand
} from './application/commands/impl'
import { GithubRegisterDTO, GoogleRegisterDTO } from './core/dtos'
import { TokensType } from './application/commands/handlers'
import { Response } from 'express'

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly argon2Adapter: Argon2Adapter,
		private readonly commandBus: CommandBus
	) {}

	public async validateUser(data: ValidateUserType): Promise<User | null> {
		const user: User | null = await this.userRepository.findUserByEmail({
			email: data.email
		})
		if (!user) return null

		const isValidPassword: boolean = await this.argon2Adapter.verify({
			hashPassword: user.hashPassword,
			password: data.password
		})
		if (!isValidPassword) return null

		if (!user.isConfirmed)
			throw new ForbiddenException('You have to confirm your email')

		if (user.isBlocked) throw new ForbiddenException('Your account has been blocked')

		return user
	}

	public async newTokens(
		payload: JwtRefreshPayload,
		{ userIP, userAgent }: { userIP: string; userAgent: string }
	) {
		await this.commandBus.execute(
			new LogoutCommand({ userID: payload.userID, sessionID: payload.sessionID })
		)
		return this.commandBus.execute(
			new GenerateTokensCommand({ userID: payload.userID, userIP, userAgent })
		)
	}

	public async googleRegister(
		dto: GoogleRegisterDTO,
		info: { userIP: string; userAgent: string }
	): Promise<TokensType> {
		const googleProfile: GoogleProfile = await this.commandBus.execute(
			new GoogleRegisterCommand(dto)
		)
		return this.commandBus.execute(
			new GenerateTokensCommand({
				userID: googleProfile.userID,
				userIP: info.userIP,
				userAgent: info.userAgent
			})
		)
	}

	public async githubRegister(
		dto: GithubRegisterDTO,
		info: { userIP: string; userAgent: string },
		res: Response
	): Promise<TokensType> {
		const githubProfile: GithubProfile = await this.commandBus.execute(
			new GithubRegisterCommand(dto, res)
		)
		return this.commandBus.execute(
			new GenerateTokensCommand({
				userID: githubProfile.userID,
				userIP: info.userIP,
				userAgent: info.userAgent
			})
		)
	}

	// helpers
	public async genUniqueUsername({ prefix }: { prefix: string }): Promise<string> {
		let isUsernameTaken: boolean
		let uniqueUsername: string
		let suffix: number = 1

		do {
			isUsernameTaken = await this.userRepository.checkIsUniqueLogin({
				login: uniqueUsername
			})
			if (isUsernameTaken) {
				uniqueUsername = `${prefix}-${suffix}`
				suffix++
			}
		} while (isUsernameTaken)

		return uniqueUsername
	}
}
