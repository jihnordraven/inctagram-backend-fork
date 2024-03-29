import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../../auth.service'
import { User } from '@prisma/client'

export type ValidateUserType = {
	readonly email: string
	readonly password: string
}

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email'
		})
	}

	public async validate(email: string, password: string): Promise<User> {
		return this.authService.validateUser({ email, password })
	}
}
