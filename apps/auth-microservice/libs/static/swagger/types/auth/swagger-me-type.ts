import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerMeType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Get short info about current user' }),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Returns info about current user'
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Access token is not valid, expired or missing'
		})
	)
}
