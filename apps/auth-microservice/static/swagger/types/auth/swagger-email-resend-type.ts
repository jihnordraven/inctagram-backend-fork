import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerEmailResendType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Resend confirmation code' }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "Operation gone OK, emailed a confirmation link to user's email"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Code is not valid to UUID'
		})
	)
}
