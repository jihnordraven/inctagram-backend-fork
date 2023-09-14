import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler'
import { PrismaService } from 'prisma/prisma.service'
import { User } from '@prisma/client'
import { red } from 'colorette'

@SkipThrottle()
@Injectable()
export class UserRepository {
	private logger: Logger = new Logger(UserRepository.name)

	constructor(protected prisma: PrismaService) {}

	async deleteAllData() {
		await this.prisma.user.deleteMany()
	}

	public async checkIsUniqueEmail({ email }: { email: string }): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { email } }))
	}

	public async checkIsUniqueLogin({ login }: { login: string }): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { login } }))
	}

	public async createUser(data: {
		email: string
		login: string
		hashPassword: string
	}) {
		const user: User | void = await this.prisma.user
			.create({
				data: {
					email: data.email,
					login: data.login,
					hashPassword: data.hashPassword
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!user) throw new InternalServerErrorException('Unable to create user')
		return user
	}

	public async confirmUser({ userID }: { userID: string }): Promise<void> {
		await this.prisma.user.update({
			where: { id: userID },
			data: { isConfirmed: true }
		})
	}

	public async findUserByEmail({ email }: { email: string }): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } })
	}

	public async findUserById({ userID }: { userID: string }): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id: userID } })
	}

	public async newPassword({
		userID,
		newHashPassword
	}: {
		userID: string
		newHashPassword: string
	}): Promise<void> {
		await this.prisma.user.update({
			where: { id: userID },
			data: { hashPassword: newHashPassword }
		})
	}

	async findUserByLoginOrEmail(loginOrEmail: string, pass: string) {
		const result = await this.prisma.user.findFirst({
			where: {
				OR: [{ login: loginOrEmail }, { email: loginOrEmail }]
			}
		})

		console.log(result, ' result in findUserByLoginOrEmail')
		if (!result) {
			return null
		}
		return result
	}

	// async createUnconfirmedUser(login: string, password: string, email: string) {
	// 	const code = this.common.createEmailSendCode()
	// 	const newUnconfirmedUser = User.createUnconfirmedUser(
	// 		login,
	// 		password,
	// 		email,
	// 		code
	// 	)

	// 	const newlyCreatedUserQuery = await this.prisma.user.create({
	// 		data: newUnconfirmedUser
	// 	})
	// 	return newlyCreatedUserQuery
	// }

	// async changeUsersConfirmationCode(id: string, confirmationCode: string) {
	// 	const newCodeDateOfExpiary = addMinutes(new Date(), 30).toISOString()
	// 	console.log(newCodeDateOfExpiary, '-><-')
	// 	console.log(new Date().toISOString(), '-><-')
	// 	console.log(addMinutes(new Date(), 30), '-><-')

	// 	await this.prisma.user.update({
	// 		where: { id },
	// 		data: {
	// 			code: confirmationCode,
	// 			codeDateOfExpiary: newCodeDateOfExpiary
	// 		}
	// 	})
	// }

	// async findUserByRegistrationCode(code: string) {
	// 	console.log(code, ' code in findUserByRegistrationCode')
	// 	if (!code) {
	// 		return null
	// 	}
	// 	const foundUser = await this.prisma.user.findFirst({
	// 		where: {
	// 			code
	// 		}
	// 	})

	// 	return foundUser
	// }

	// async findUserCodeFreshness(foundUser: User) {
	// 	return new Date().toISOString() < foundUser.codeDateOfExpiary!
	// }

	// async makeUserConfirmed(foundUser: User) {
	// 	await this.prisma.user.update({
	// 		where: { id: foundUser.id },
	// 		data: {
	// 			code: null,
	// 			codeDateOfExpiary: null,
	// 			isConfirmed: true
	// 		}
	// 	})
	// }

	async findUserByLogin(login: string) {
		console.log(login, 'login in findUserById')
		if (!login) {
			return null
		}

		const result = await this.prisma.user.findFirst({
			where: {
				login
			}
		})
		return result
	}

	async getAllUsersFromDBWithoutPagination() {
		return this.prisma.user.findMany()
	}
}
