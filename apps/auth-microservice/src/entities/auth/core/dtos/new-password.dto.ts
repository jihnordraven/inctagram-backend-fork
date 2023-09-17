import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { PasswordPattern } from '../../../../../helpers/patterns'
import { ApiProperty } from '@nestjs/swagger'

export class NewPasswordDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(PasswordPattern())
	@Length(6, 20)
	readonly newPassword: string
}
