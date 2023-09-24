import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { EmailPattern } from '../../../../../utils/patterns'
import { TrimValidate } from '../../../../../utils/validations'
import { ApiProperty } from '@nestjs/swagger'

export class PasswordRecoveryDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	@TrimValidate()
	readonly email: string
}
