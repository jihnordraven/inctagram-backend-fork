import { ForbiddenException, Injectable } from '@nestjs/common'
import { ValidateUserType } from './guards-handlers/strategies/local.strategy'
import { GithubProfile, GoogleProfile, User } from '@prisma/client'
import { JwtRefreshPayload } from './guards-handlers/strategies'
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
import { Argon2Adapter } from './adapters'
import { UsersRepository } from '../users/users.reposiroty'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly argon2Adapter: Argon2Adapter,
		private readonly commandBus: CommandBus
	) {}

	public async validateUser(data: ValidateUserType): Promise<User | null> {
		const user: User | null = await this.usersRepository.findUserByEmail({
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
		let isUsernameTaken: User | null
		let uniqueUsername: string
		let suffix: number = 1

		do {
			isUsernameTaken = await this.usersRepository.findUserByLogin({
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
