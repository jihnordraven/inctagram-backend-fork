import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CONFIG } from 'libs/common/src/config'
import { Strategy } from 'passport-github2'

@Injectable()
export class Github2Strategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: 'fdasfsa',
			clientSecret: 'fdahfks',
			callbackURL: `${CONFIG.HOST}/api/auth/github/callback`,
			scopes: ['public_profile']
		})
	}

	public validate(accessToken: string): { accessToken: string } {
		return { accessToken: accessToken }
	}
}
