import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler'
import { Profile, User } from '@prisma/client'
import { red } from 'colorette'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../prisma/prisma.service'
import { EditProfileDTO } from './core/dtos'

@SkipThrottle()
@Injectable()
export class UsersRepository {
	private logger: Logger = new Logger(UsersRepository.name)

	constructor(
		protected prisma: PrismaService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache
	) {}

	async deleteAllData() {
		await this.prisma.user.deleteMany()
	}

	public async findUserByEmail({ email }: { email: string }): Promise<User | null> {
		const user: User | null = await this.cache.get(`user-email-${email}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findUnique({
				where: { email }
			})
			if (!user) return null
			await this.cache.set(`user-email-${user.email}`, user, 1800)
			return user
		}
		return user
	}

	public async findUserByLogin({ login }: { login: string }): Promise<User | null> {
		console.log(login)
		const user: User | null = await this.cache.get(`user-login-${login}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findUnique({
				where: { login }
			})
			if (!user) return null
			await this.cache.set(`user-login-${login}`, user, 1800)
			return user
		}
		return user
	}

	public async findUserById({ userID }: { userID: string }): Promise<User | null> {
		const user: User | null = await this.cache.get(`user-id-${userID}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findUnique({
				where: { id: userID }
			})
			if (!user) return null
			await this.cache.set(`user-id-${userID}`, user, 1800)
			return user
		}
		return user
	}

	public async createUser(data: {
		email: string
		login: string
		hashPassword?: string
		isConfirmed?: boolean
	}) {
		const user: User | void = await this.prisma.user
			.create({
				data: {
					email: data.email,
					login: data.login,
					hashPassword: data.hashPassword,
					isConfirmed: data.isConfirmed ?? false
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!user) throw new InternalServerErrorException('Unable to create user')
		await this.cache.set(`user-email-${user.email}`, user, 1800)
		return user
	}

	public async confirmUser({ userID }: { userID: string }): Promise<void> {
		const user = await this.prisma.user.update({
			where: { id: userID },
			data: { isConfirmed: true }
		})
		// clean cache
		const cacheKeys: string[] = await this.getCacheKeys({
			email: user.email,
			login: user.login,
			id: user.id
		})
		for (const key of cacheKeys) {
			await this.cache.del(key)
		}
		// clean cache
	}

	public async createProfile({
		username,
		userID
	}: {
		username: string
		userID: string
	}) {
		await this.prisma.profile.create({
			data: {
				username,
				userID,
				firstName: '',
				lastName: ''
			}
		})
	}

	public async newPassword({
		userID,
		newHashPassword
	}: {
		userID: string
		newHashPassword: string
	}): Promise<void> {
		const user = await this.prisma.user.update({
			where: { id: userID },
			data: { hashPassword: newHashPassword }
		})
		// clean cache
		const cacheKeys: string[] = await this.getCacheKeys({
			email: user.email,
			login: user.login,
			id: user.id
		})
		for (const key of cacheKeys) {
			await this.cache.del(key)
		}
		// clean cache
	}

	public async deleteUser({ userID }: { userID: string }): Promise<void> {
		const user: User | null = await this.findUserById({ userID })
		if (!user) throw new NotFoundException('User not found')

		// clean cache
		const cacheKeys: string[] = await this.getCacheKeys({
			email: user.email,
			login: user.login,
			id: user.id
		})
		for (const key of cacheKeys) {
			await this.cache.del(key)
		}
		// clean cache
	}

	// helpers
	private async getCacheKeys({
		email,
		login,
		id
	}: {
		email: string
		login: string
		id: string
	}): Promise<any> {
		return [`user-email-${email}`, `user-login-${login}`, `user-id-${id}`]
	}

	// profile
	public async editProfile(dto: EditProfileDTO, userID: string): Promise<Profile> {
		const profile: Profile | void = await this.prisma.profile
			.update({
				where: { userID },
				data: dto
			})
			.catch((err: string) => this.logger.error(err))
		if (!profile) throw new InternalServerErrorException('Unable to edit profile')

		return profile
	}

	public async editAvatar(data: { avatarUrl: string; userID: string }): Promise<void> {
		await this.prisma.profile.update({
			where: { userID: data.userID },
			data: { avatarUrl: data.avatarUrl }
		})
	}
}
