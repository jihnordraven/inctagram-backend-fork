import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { PasswordPattern } from 'src/helpers/patterns/validation.patterns'

export class NewPasswordDTO {
	@IsNotEmpty()
	@IsString()
	@Matches(PasswordPattern())
	@Length(6, 20)
	readonly newPassword: string
}
