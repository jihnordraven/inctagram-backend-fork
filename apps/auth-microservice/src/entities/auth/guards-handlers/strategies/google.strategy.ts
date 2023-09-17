import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CONFIG } from '../../../../../config'
import { Strategy } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: CONFIG.GOOGLE_CLIENT_ID,
			clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
			callbackURL: `${CONFIG.HOST}/api/auth/google/callback`,
			scope: ['profile', 'email']
		})
	}

	public validate(accessToken: string): { accessToken: string } {
		return { accessToken: accessToken }
	}
}
