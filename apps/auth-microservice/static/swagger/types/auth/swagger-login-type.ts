import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger'
import { EmailPattern, PasswordPattern } from '../../../../utils/patterns'

class LoginDTO {
	@ApiProperty({
		description: 'User email',
		example: 'example@gmail.com',
		type: String,
		pattern: String(EmailPattern()),
		nullable: false
	})
	readonly email: string

	@ApiProperty({
		description: 'User password',
		example: 'Password123%',
		type: String,
		minLength: 6,
		maxLength: 20,
		pattern: String(PasswordPattern()),
		nullable: false
	})
	readonly password: string
}

class LoginResType {
	@ApiProperty({ description: 'Access tokens' })
	readonly accessToken: string
}

export const SwaggerLoginType = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Login command' }),
		ApiBody({ type: LoginDTO }),
		ApiResponse({
			status: HttpStatus.OK,
			description:
				'User logged in successfully, returns an accessToken in body and refreshToken in cookies',
			type: LoginResType
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Invalid login or email'
		})
	)
}
