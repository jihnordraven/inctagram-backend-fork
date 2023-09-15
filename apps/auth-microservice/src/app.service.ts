import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CONFIG } from './config'
import { StatusEnum } from '../../../helpers/enums'

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async truncateDB(): Promise<void> {
		if (CONFIG.STATUS !== StatusEnum.PRODUCTION) {
			await this.prisma.user.deleteMany()
			await this.prisma.session.deleteMany()
			await this.prisma.emailCode.deleteMany()
			await this.prisma.googleProfile.deleteMany()
			await this.prisma.githubProfile.deleteMany()
		} else {
			throw new ForbiddenException(
				'This endpoint is only available in developmenr or staging status'
			)
		}
	}
}
