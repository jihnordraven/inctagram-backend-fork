import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { EmailPattern } from '../../../../../../../helpers/patterns'
import { TrimValidate } from '../../../../../../../helpers/validations'

export class PasswordRecoveryDTO {
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string
}
