import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
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
		hashPassword?: string
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

	public async deleteUser({ userID }: { userID: string }): Promise<void> {
		const user: User | null = await this.findUserById({ userID })
		if (!user) throw new NotFoundException('User not found')
		await this.prisma.user.delete({ where: { ...user } })
	}
}
