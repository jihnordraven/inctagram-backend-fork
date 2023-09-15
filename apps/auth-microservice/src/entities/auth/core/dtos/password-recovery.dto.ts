import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { EmailPattern } from '../../../../../../../helpers/patterns'
import { TrimValidate } from '../../../../../../../helpers/validations'
import { ApiProperty } from '@nestjs/swagger'

export class PasswordRecoveryDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string
}
