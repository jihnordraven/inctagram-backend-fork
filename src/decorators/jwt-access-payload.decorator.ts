import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtAccessPayload } from '../modules/auth/protection/strategies'
import { Request } from 'express'

export const JwtAccessPayloadDecorator = createParamDecorator(
	(
		key: keyof JwtAccessPayload,
		ctx: ExecutionContext
	): JwtAccessPayload | keyof JwtAccessPayload => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
