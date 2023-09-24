import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../../../../utils/decorators'

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
	constructor(private readonly reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext): boolean | any {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (isPublic) return true

		return super.canActivate(context)
	}
}
