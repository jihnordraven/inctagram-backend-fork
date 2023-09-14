import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { JwtEnum } from 'src/helpers/enums'
import { Strategy } from 'passport-jwt'

const RefreshCookieExtractor = (req: Request): string => {
	let token: null | string = null
	if (req && req.cookies) {
		token = req.cookies[JwtEnum.REFRESH_TOKEN]
	}
	return token
}

export type JwtRefreshPayload = {
	readonly userID: string
	readonly sessionID: string
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: RefreshCookieExtractor,
			secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtRefreshPayload): Promise<JwtRefreshPayload> {
		return { userID: payload.userID, sessionID: payload.sessionID }
	}
}
