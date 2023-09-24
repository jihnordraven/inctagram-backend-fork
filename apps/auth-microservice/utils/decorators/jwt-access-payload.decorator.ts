import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtAccessPayload } from 'apps/auth-microservice/src/entities/auth/guards-handlers/strategies'
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
