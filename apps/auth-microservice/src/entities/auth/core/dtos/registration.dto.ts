import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import {
	EmailPattern,
	LoginPattern,
	PasswordPattern
} from '../../../../../../../helpers/patterns'
import { TrimValidate } from '../../../../../../../helpers/validations'

export class RegistrationDTO {
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string

	@IsNotEmpty()
	@Matches(LoginPattern())
	@IsString()
	@Length(3, 10)
	@TrimValidate()
	readonly login: string

	@IsNotEmpty()
	@Matches(PasswordPattern())
	@Length(6, 20)
	@TrimValidate()
	readonly password: string
}
