import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { StatusEnum } from '../helpers/enums'
import { CONFIG } from '../config'
import { User } from '@prisma/client'

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	public async seedDB(): Promise<User> {
		if (CONFIG.MODE !== StatusEnum.PRODUCTION) {
			let isEmailTaken: boolean
			let isLoginTaken: boolean

			let uniqueEmail: string
			let uniqueLogin: string
			let emailSuffix: number = 1
			let loginSuffix: number = 1

			do {
				isEmailTaken = Boolean(
					await this.prisma.user.findUnique({ where: { email: uniqueEmail } })
				)
				if (isEmailTaken) {
					uniqueEmail = `email-${emailSuffix}@mock.com`
					emailSuffix++
				}

				isLoginTaken = Boolean(
					await this.prisma.user.findUnique({ where: { login: uniqueLogin } })
				)
				if (isLoginTaken) {
					uniqueLogin = `login-${loginSuffix}`
				}
			} while (isLoginTaken && isLoginTaken)

			return this.prisma.user.create({
				data: {
					email: uniqueEmail,
					login: uniqueLogin,
					hashPassword: 'Password123%'
				}
			})
		} else {
			throw new ForbiddenException(
				'This endpoint is only available in development or staging mode'
			)
		}
	}

	public async truncateDB(table: string): Promise<void> {
		const isProduction: boolean = Boolean(CONFIG.MODE === StatusEnum.PRODUCTION)

		if (table.trim() && !isProduction) {
			await this.prisma[table].deleteMany()
			return
		} else if (!isProduction) {
			await this.prisma.user.deleteMany()
			await this.prisma.session.deleteMany()
			await this.prisma.emailCode.deleteMany()
			await this.prisma.googleProfile.deleteMany()
			await this.prisma.githubProfile.deleteMany()
		} else {
			throw new ForbiddenException(
				'This endpoint is only available in development or staging mode'
			)
		}
	}
}
