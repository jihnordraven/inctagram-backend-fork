import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerNewPasswordType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Create new password' }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "User's password changed successfully"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Invalid input data'
		})
	)
}
