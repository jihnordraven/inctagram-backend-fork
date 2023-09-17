import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { Session } from '@prisma/client'
import { red } from 'colorette'
import { add } from 'date-fns'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../prisma/prisma.service'

@Injectable()
export class SessionsRepository {
	private logger: Logger = new Logger(SessionsRepository.name)

	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache
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
		await this.cache.set(`session-id-${session.id}`, session, 600)
		return session
	}

	public async findSessionByID({
		sessionID
	}: {
		sessionID: string
	}): Promise<Session | null> {
		const session: Session | null = await this.cache.get(`session-id-${sessionID}`)
		if (!session) {
			const session: Session | null = await this.prisma.session.findUnique({
				where: { id: sessionID }
			})
			if (!session) return null
			await this.cache.set(`session-id-${session.id}`, session, 600)
			return session
		}
		return session
	}

	public async deleteSessionByID({ sessionID }: { sessionID: string }): Promise<void> {
		const isSession: Session | null = await this.findSessionByID({ sessionID })

		if (!isSession) throw new NotFoundException('Session not found')

		const session: Session = await this.prisma.session.delete({
			where: { ...isSession }
		})

		await this.cache.del(`session-id-${session.id}`)
	}
}
