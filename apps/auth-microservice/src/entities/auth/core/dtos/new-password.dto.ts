import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PasswordPattern } from '../../../../../utils/patterns'

export class NewPasswordDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(PasswordPattern())
	@Length(6, 20)
	readonly newPassword: string
}
