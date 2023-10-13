import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CONFIG } from '../../../../../../../libs/common/src/config'
import { Strategy } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: 'fdahdfskhf',
			clientSecret: 'fdsafhdskjf',
			callbackURL: `${CONFIG.HOST}/api/auth/google/callback`,
			scope: ['profile', 'email']
		})
	}

	public validate(accessToken: string): { accessToken: string } {
		return { accessToken: accessToken }
	}
}
