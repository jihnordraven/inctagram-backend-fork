import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerGoogleRegisterType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Get or create google profile' }),
		ApiResponse({ status: HttpStatus.OK }),
		ApiResponse({ status: HttpStatus.BAD_REQUEST })
	)
}
