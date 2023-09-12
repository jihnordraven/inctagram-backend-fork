import {
  IS_NUMBER_STRING,
  IS_UUID, IsArray,
  IsBoolean, IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotIn, IsNumber, IsNumberString,
  IsObject,
  IsString,
  IsUrl, IsUUID, isUUID,
  Length,
  Matches,

} from "class-validator";




export class UserDTO {
  @IsNotEmpty()
  @Length(3, 10)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  login : string //maxLength: 10 minLength: 3 pattern: ^[a-zA-Z0-9_-]*$

  @IsNotEmpty()
  @Length(6, 20)
  password: string // maxLength: 20 minLength: 6
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email : string // pattern: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
}

export class LoginDTO {
  @IsNotEmpty()
  loginOrEmail : string //maxLength: 10 minLength: 3 pattern: ^[a-zA-Z0-9_-]*$

  @IsNotEmpty()
  @Length(6, 20)
  password: string // maxLength: 20 minLength: 6
}
export class emailDTO {
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email : string //maxLength: 10 minLength: 3 pattern: ^[a-zA-Z0-9_-]*$

}