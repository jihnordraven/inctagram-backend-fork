import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CONFIG } from '../config'
import { StatusEnum } from '../../../helpers/enums'

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	public async seedDB(): Promise<void> {
		for (let i = 0; i < 3; i++) {
			await this.prisma.user.create({
				data: {
					email: `${i}-mock@gmail.com`,
					login: `${i}-mock-username`,
					hashPassword: 'mock-password',
					isConfirmed: true
				}
			})
		}
	}

	public async truncateDB(): Promise<void> {
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
