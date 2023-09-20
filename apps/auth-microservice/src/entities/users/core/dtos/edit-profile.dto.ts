import { ApiProperty } from '@nestjs/swagger'
import { LoginPattern, NamePattern } from 'apps/auth-microservice/helpers/patterns'
import { IsNotEmpty, IsOptional, Matches, MaxLength } from 'class-validator'

export class EditProfileDTO {
	@ApiProperty()
	@IsOptional()
	@Matches(LoginPattern())
	public readonly username: string

	@ApiProperty()
	@IsNotEmpty()
	@Matches(NamePattern())
	public readonly firstName: string

	@ApiProperty()
	@IsNotEmpty()
	@Matches(NamePattern())
	public readonly lastName: string

	@ApiProperty()
	@IsOptional()
	public readonly birthday?: string | null

	@ApiProperty()
	@IsOptional()
	public readonly city?: string | null

	@ApiProperty()
	@IsOptional()
	@MaxLength(200)
	@Matches(/^[0-9A-Za-zА-Яа-я\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/)
	public readonly aboutMe?: string | null
}
