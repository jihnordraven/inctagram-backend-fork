import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { EmailPattern } from 'helpers/patterns'

export class GithubRegisterDTO {
	@ApiProperty()
	@IsOptional()
	readonly login?: string | null

	@ApiProperty()
	@IsNotEmpty()
	readonly node_id: string

	@ApiProperty()
	@IsOptional()
	readonly avatar_url?: string | null

	@ApiProperty()
	@IsOptional()
	readonly name?: string | null

	@ApiProperty()
	@IsOptional()
	@Matches(EmailPattern())
	readonly email?: string | null
}
