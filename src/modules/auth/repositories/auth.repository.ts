import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailCode, GithubProfile, GoogleProfile, Session } from '@prisma/client'
import { red } from 'colorette'
import { add } from 'date-fns'
import { PrismaService } from 'prisma/prisma.service'
import { v4 } from 'uuid'
import { GithubRegisterDTO, GoogleRegisterDTO } from '../core/dtos'

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
					givenName: dto.given_name,
					familyName: dto.family_name,
					name: dto.name,
					avatar: dto.picture,
					isConfirmed: dto.email_verified,
					locale: dto.locale,
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
					avatar: dto.avatar_url,
					userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!githubProfile)
			throw new InternalServerErrorException('Unable to create new github profile')
		return githubProfile
	}
	// github oauth
}
