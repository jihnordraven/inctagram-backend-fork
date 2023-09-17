import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { JwtEnum } from 'apps/auth-microservice/helpers/enums'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { SessionsService } from '../../../sessions/sessions.service'
import { CONFIG } from 'apps/auth-microservice/libs/config'

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
	readonly iat?: number
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private readonly sessionService: SessionsService) {
		super({
			jwtFromRequest: RefreshCookieExtractor,
			secretOrKey: CONFIG.JWT_REFRESH_SECRET,
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtRefreshPayload): Promise<JwtRefreshPayload> {
		const session: boolean = await this.sessionService.validateSession({
			sessionID: payload.sessionID,
			expiresIn: payload.iat
		})
		if (!session) throw new UnauthorizedException()
		return { userID: payload.userID, sessionID: payload.sessionID }
	}
}
