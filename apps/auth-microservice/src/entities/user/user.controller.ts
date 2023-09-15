import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users endpoints')
@Controller('users')
export class UserController {}
