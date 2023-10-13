import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CONFIG } from 'libs/common/src/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

export type JwtAccessPayload = {
	userID: string
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'secret',
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtAccessPayload): Promise<JwtAccessPayload> {
		return { userID: payload.userID }
	}
}
