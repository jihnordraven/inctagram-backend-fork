import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LogoutCommand } from '../impl'
import { Session } from '@prisma/client'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { SessionRepository } from '../../../../session/session.repository'

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	constructor(protected readonly sessionRepository: SessionRepository) {}

	public async execute({ dto }: LogoutCommand): Promise<void> {
		const session: Session | null = await this.sessionRepository.findSessionByID({
			sessionID: dto.sessionID
		})

		if (!session) throw new NotFoundException('Session not found')

		if (dto.userID !== session.userID) throw new ForbiddenException()

		await this.sessionRepository.deleteSessionByID({ sessionID: dto.sessionID })
	}
}
