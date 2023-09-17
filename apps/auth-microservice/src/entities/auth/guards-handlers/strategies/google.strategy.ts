import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CONFIG } from 'apps/auth-microservice/libs/config'
import { Strategy } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID:
				'55902056098-rn96jglrndautq681c71999gek6qjhck.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: `${CONFIG.HOST}/api/auth/google/callback`,
			scope: ['profile', 'email']
		})
	}

	public validate(accessToken: string): { accessToken: string } {
		return { accessToken: accessToken }
	}
}
