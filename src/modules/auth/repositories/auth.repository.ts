import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailCode, Session } from '@prisma/client'
import { red } from 'colorette'
import { add } from 'date-fns'
import { PrismaService } from 'prisma/prisma.service'
import { v4 } from 'uuid'

@Injectable()
export class AuthRepository {
	private logger: Logger = new Logger()

	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService
	) {}

	public async createEmailCode(data: { userID: string }): Promise<string> {
		const emailCode: EmailCode | void = await this.prisma.emailCode
			.create({
				data: {
					code: v4(),
					expiresIn: add(new Date(), { minutes: 10 }),
					userID: data.userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!emailCode)
			throw new InternalServerErrorException('Unable to create new email code')
		return emailCode.code
	}

	public async findEmailCodeByCode({
		code
	}: {
		code: string
	}): Promise<EmailCode | null> {
		return this.prisma.emailCode.findUnique({ where: { code } })
	}

	public async deactivateEmailCodeByCode({ code }: { code: string }): Promise<void> {
		await this.prisma.emailCode.update({ where: { code }, data: { isUsed: true } })
	}
}
