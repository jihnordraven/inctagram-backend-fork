import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TrimValidate } from '../../../../../utils/validations'
import {
	EmailPattern,
	LoginPattern,
	PasswordPattern
} from '../../../../../utils/patterns'

export class RegistrationDTO {
	@ApiProperty({
		type: String,
		description: 'User email',
		example: 'example@gmail.com',
		pattern: String(EmailPattern()),
		nullable: false
	})
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string

	@ApiProperty({
		type: String,
		description: 'User login',
		example: 'login123',
		pattern: String(LoginPattern()),
		nullable: false
	})
	@IsNotEmpty()
	@Matches(LoginPattern())
	@IsString()
	@Length(3, 10)
	@TrimValidate()
	readonly login: string

	@ApiProperty({
		type: String,
		description: 'User password',
		example: 'password123%',
		pattern: String(PasswordPattern()),
		nullable: false
	})
	@IsNotEmpty()
	@Matches(PasswordPattern())
	@Length(6, 20)
	@TrimValidate()
	readonly password: string
}
