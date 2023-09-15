import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import {
	EmailPattern,
	LoginPattern,
	PasswordPattern
} from '../../../../../../../helpers/patterns'
import { TrimValidate } from '../../../../../../../helpers/validations'
import { ApiProperty } from '@nestjs/swagger'

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
