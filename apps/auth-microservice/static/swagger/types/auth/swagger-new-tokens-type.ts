import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export const SwaggerNewTokensType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Get new tokens by refresh' }),
		ApiResponse({
			status: HttpStatus.OK,
			description:
				'Operation gone successfully. Returns accessToken in body and refreshToken in cookies'
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'JWT Refresh tokens is not valid, expired or missing'
		})
	)
}
