import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LogoutCommand } from '../impl'
import { Session } from '@prisma/client'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { SessionsRepository } from '../../../../sessions/sessions.repository'

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	constructor(protected readonly sessionsRepository: SessionsRepository) {}

	public async execute({ dto }: LogoutCommand): Promise<void> {
		const session: Session | null = await this.sessionsRepository.findSessionByID({
			sessionID: dto.sessionID
		})

		if (!session) throw new NotFoundException('Session not found')

		if (dto.userID !== session.userID) throw new ForbiddenException()

		await this.sessionsRepository.deleteSessionByID({ sessionID: dto.sessionID })
	}
}
