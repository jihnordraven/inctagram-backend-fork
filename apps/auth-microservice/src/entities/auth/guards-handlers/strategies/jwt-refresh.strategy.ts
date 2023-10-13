import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { SessionsService } from '../../../sessions/sessions.service'
import { CONFIG } from 'libs/common/src/config'
import { TokensEnum } from 'apps/auth-microservice/utils/enums'

const RefreshCookieExtractor = (req: Request): string => {
	let token: null | string = null
	if (req && req.cookies) {
		token = req.cookies[TokensEnum.REFRESH_TOKEN]
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
			secretOrKey: 'secret',
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtRefreshPayload): Promise<JwtRefreshPayload> {
		console.log(payload)
		const session: boolean = await this.sessionService.validateSession({
			sessionID: payload.sessionID,
			expiresIn: payload.iat
		})
		if (!session) throw new UnauthorizedException()
		return { userID: payload.userID, sessionID: payload.sessionID }
	}
}
