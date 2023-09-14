import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserRepository } from '../../user/user.reposiroty'
import { ValidateUserType } from '../protection/strategies/local.strategy'
import { User } from '@prisma/client'
import { Argon2Adapter } from 'src/adapters/argon2.adapter'
import { JwtRefreshPayload } from '../protection/strategies'
import { CommandBus } from '@nestjs/cqrs'
import { GenerateTokensCommand, LogoutCommand } from './commands/impl'

type payloadType = {
	userId: string
	login: string
	iat: number
	exp: number
}

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
}
