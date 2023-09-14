import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { EmailPattern } from 'src/helpers/patterns/validation.patterns'
import { TrimValidate } from 'src/helpers/validations'

export class PasswordRecoveryDTO {
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string
}
