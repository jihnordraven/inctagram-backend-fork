import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewPasswordCommand } from '../impl'
import { UserRepository } from '../../../../user/user.reposiroty'
import { EmailCode } from '@prisma/client'
import { AuthRepository } from '../../../../auth/repositories/auth.repository'
import { ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Argon2Adapter } from '../../../../../adapters/argon2.adapter'

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
	private FRONTEND_HOST: string = this.config.get<string>('FRONTEND_HOST')

	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly userRepository: UserRepository,
		protected readonly config: ConfigService,
		protected readonly argon2Adapter: Argon2Adapter
	) {}

	public async execute({ dto }: NewPasswordCommand): Promise<void> {
		const isCode: EmailCode | null = await this.authRepository.findEmailCodeByCode({
			code: dto.code
		})

		if (!isCode) throw new UnauthorizedException('Invalid token')

		if (isCode.isUsed) throw new ForbiddenException('Token has already been used')

		const isCodeExpired: boolean = Boolean(new Date(isCode.expiresIn) < new Date())
		if (isCodeExpired) {
			dto.res.redirect(`${this.FRONTEND_HOST}/auth/expired?code=${isCode.code}`)
		}

		const newHashPassword: string = await this.argon2Adapter.hash({
			password: dto.newPassword
		})

		await this.authRepository.deactivateEmailCodeByCode({ code: isCode.code })
		await this.userRepository.newPassword({ userID: isCode.userID, newHashPassword })
	}
}
