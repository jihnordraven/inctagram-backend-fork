import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { EmailPattern } from 'helpers/patterns'

export class GoogleRegisterDTO {
	@ApiProperty()
	@IsNotEmpty()
	readonly sub: string

	@ApiProperty()
	@IsOptional()
	readonly name?: string | null

	@ApiProperty()
	@IsOptional()
	readonly given_name?: string | null

	@ApiProperty()
	@IsOptional()
	readonly family_name?: string | null

	@ApiProperty()
	@IsOptional()
	readonly picture?: string | null

	@ApiProperty()
	@IsNotEmpty()
	@Matches(EmailPattern())
	readonly email: string

	@ApiProperty()
	readonly email_verified: boolean

	@ApiProperty()
	@IsOptional()
	readonly locale?: string | null
}
