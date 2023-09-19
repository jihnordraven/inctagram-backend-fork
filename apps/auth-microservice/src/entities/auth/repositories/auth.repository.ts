import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { EmailCode, GithubProfile, GoogleProfile } from '@prisma/client'
import { red } from 'colorette'
import { add } from 'date-fns'
import { PrismaService } from 'apps/auth-microservice/prisma/prisma.service'
import { v4 } from 'uuid'
import { GithubRegisterDTO, GoogleRegisterDTO } from '../core/dtos'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class AuthRepository {
	private logger: Logger = new Logger()

	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache
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
		await this.cache.set(`email_code-code-${emailCode.code}`, emailCode, 900)
		return emailCode.code
	}

	public async findEmailCodeByCode({
		code
	}: {
		code: string
	}): Promise<EmailCode | null> {
		const emailCode: EmailCode | null = await this.cache.get(
			`email_code-code-${code}`
		)
		if (!emailCode) {
			const emailCode: EmailCode | null = await this.prisma.emailCode.findUnique({
				where: { code }
			})
			if (!emailCode) return null
			await this.cache.set(`email_code-code-${emailCode.code}`, code, 900)
			return emailCode
		}
		return emailCode
	}

	public async deactivateEmailCodeByCode({ code }: { code: string }): Promise<void> {
		await this.prisma.emailCode.update({ where: { code }, data: { isUsed: true } })

		await this.cache.del(`email_code-code-${code}`)
	}

	public async deactivateAllEmailCodesByUserID({
		userID
	}: {
		userID: string
	}): Promise<void> {
		await this.prisma.emailCode.updateMany({
			where: { userID },
			data: { isUsed: true }
		})
	}

	// google oauth
	public async findGoogleProfileByProviderID({
		providerID
	}: {
		providerID: string
	}): Promise<GoogleProfile | null> {
		return this.prisma.googleProfile.findUnique({ where: { providerID } })
	}

	public async findGoogleProfileByUserID({
		userID
	}: {
		userID: string
	}): Promise<GoogleProfile | null> {
		return this.prisma.googleProfile.findUnique({ where: { userID } })
	}

	public async createGoogleProfile(
		dto: GoogleRegisterDTO,
		{ userID }: { userID: string }
	): Promise<GoogleProfile> {
		const googleProfile: GoogleProfile | void = await this.prisma.googleProfile
			.create({
				data: {
					providerID: dto.sub,
					email: dto.email,
					userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!googleProfile)
			throw new InternalServerErrorException('Unable to create new google profile')
		return googleProfile
	}
	// google oauth

	// github oauth
	public async findGithubProfileByProviderID({
		providerID
	}: {
		providerID: string
	}): Promise<GithubProfile | null> {
		return this.prisma.githubProfile.findUnique({ where: { providerID } })
	}

	public async findGithubProfileByUserID({
		userID
	}: {
		userID: string
	}): Promise<GithubProfile | null> {
		return this.prisma.githubProfile.findUnique({ where: { userID } })
	}

	public async createGithubProfile(
		dto: GithubRegisterDTO,
		{ userID }: { userID: string }
	): Promise<GithubProfile> {
		const githubProfile: GithubProfile | void = await this.prisma.githubProfile
			.create({
				data: {
					providerID: dto.node_id,
					email: dto.email,
					userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!githubProfile)
			throw new InternalServerErrorException('Unable to create new github profile')
		return githubProfile
	}
}
