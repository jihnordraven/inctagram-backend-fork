import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtRefreshPayload } from '../entities/auth/guards-handlers/strategies'
import { Request } from 'express'

export const JwtRefreshPayloadDecorator = createParamDecorator(
	(key: keyof JwtRefreshPayload, ctx: ExecutionContext): JwtRefreshPayload | string => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
