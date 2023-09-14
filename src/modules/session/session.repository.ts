import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Session } from '@prisma/client'
import { red } from 'colorette'
import { add } from 'date-fns'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class SessionRepository {
	private logger: Logger = new Logger(SessionRepository.name)

	constructor(
		private readonly prisma: PrismaService // private readonly config: ConfigService
	) {}

	public async deleteAllData(): Promise<void> {
		await this.prisma.session.deleteMany()
	}

	public async createSession(data: {
		userID: string
		userIP: string
		userAgent: string
	}): Promise<Session> {
		const session: Session | void = await this.prisma.session
			.create({
				data: {
					userID: data.userID,
					userIP: data.userIP,
					userAgent: data.userAgent,
					expiresIn: add(new Date(), {
						seconds: 10
					})
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!session)
			throw new InternalServerErrorException('Unable to create new session')
		return session
	}

	public async findUniqueSessionByID({
		sessionID
	}: {
		sessionID: string
	}): Promise<Session | null> {
		return this.prisma.session.findUnique({ where: { id: sessionID } })
	}

	public async deleteSessionByID({ sessionID }: { sessionID: string }): Promise<void> {
		await this.prisma.session.delete({ where: { id: sessionID } })
	}
}
