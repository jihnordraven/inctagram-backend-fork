import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerPasswordRecoveryType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Password recovery command' }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description:
				"Operation gone successfully. Sent an confirmation link to user's email"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Invalid input data'
		})
	)
}
