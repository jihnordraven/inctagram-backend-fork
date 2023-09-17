import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { StatusEnum } from '../helpers/enums'
import { CONFIG } from '../libs/config'

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	public async seedDB(): Promise<void> {
		if (CONFIG.STATUS !== StatusEnum.PRODUCTION) {
			for (let i = 0; i < 3; i++) {
				await this.prisma.user.create({
					data: {
						email: `${i}-mock@gmail.com`,
						login: `${i}-mock-username`,
						hashPassword: 'Password123%',
						isConfirmed: true
					}
				})
			}
		}
	}

	public async truncateDB(table: string): Promise<void> {
		const isProduction: boolean = Boolean(CONFIG.STATUS === StatusEnum.PRODUCTION)

		if (table.trim() && !isProduction) {
			await this.prisma[table].deleteMany()
			return
		} else if (isProduction)
			if (!isProduction) {
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
