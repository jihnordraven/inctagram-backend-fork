import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export type JwtAccessPayload = {
	userID: string
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtAccessPayload): Promise<JwtAccessPayload> {
		return { userID: payload.userID }
	}
}
