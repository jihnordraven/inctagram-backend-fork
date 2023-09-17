import { Injectable } from '@nestjs/common'
import { SessionsRepository } from './sessions.repository'
import { Session } from '@prisma/client'

@Injectable()
export class SessionsService {
	constructor(private readonly sessionRepository: SessionsRepository) {}

	public async validateSession({
		sessionID,
		expiresIn
	}: {
		sessionID: string
		expiresIn: number
	}): Promise<boolean> {
		if (!sessionID) return false

		const session: Session = await this.sessionRepository.findSessionByID({
			sessionID
		})
		if (!session) return false

		const currentTime: Date = new Date()
		const sessionExpiresIn: Date = new Date(session.expiresIn)

		if (currentTime >= sessionExpiresIn) return false

		const sessionCreatedAt: Date = new Date(session.createdAt)
		const expirationTimeInSeconds: number = expiresIn * 1000

		if (currentTime.getTime() - sessionCreatedAt.getTime() > expirationTimeInSeconds)
			return false

		return true
	}
}
