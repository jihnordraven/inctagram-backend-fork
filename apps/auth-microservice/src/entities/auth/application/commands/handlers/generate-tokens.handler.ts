import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GenerateTokensCommand } from '../impl'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Session } from '@prisma/client'
import { SessionRepository } from '../../../../session/session.repository'
import { CONFIG } from '../../../../../../config'

export type TokensType = {
	readonly accessToken: string
	readonly refreshToken: string
}

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler implements ICommandHandler<GenerateTokensCommand> {
	constructor(
		protected readonly jwtService: JwtService,
		protected readonly config: ConfigService,
		protected readonly sessionRepository: SessionRepository
	) {}

	public async execute({ dto }: GenerateTokensCommand): Promise<TokensType> {
		const session: Session = await this.sessionRepository.createSession(dto)

		const accessToken: string = this.jwtService.sign(
			{ userID: dto.userID },
			{
				secret: CONFIG.JWT_ACCESS_SECRET,
				expiresIn: Number(CONFIG.JWT_ACCESS_EXPIRES)
			}
		)

		const refreshToken: string = this.jwtService.sign(
			{
				userID: dto.userID,
				sessionID: session.id
			},
			{
				secret: CONFIG.JWT_REFRESH_SECRET,
				expiresIn: Number(CONFIG.JWT_REFRESH_EXPIRES)
			}
		)

		return { accessToken, refreshToken }
	}
}
