import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerLogoutType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Logout command' }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: 'User session was deleted, refreshToken deleted from cookies'
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Refresh token is not valid, expired or missing'
		})
	)
}
