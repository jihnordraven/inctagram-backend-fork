import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { HttpStatus, applyDecorators } from '@nestjs/common'

export const SwaggerEmailConfirmType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Confirm user accout' }),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'User account confirmed successfully'
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Code is not valid to UUID'
		})
	)
}
