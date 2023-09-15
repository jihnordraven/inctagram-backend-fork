import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Sessions endpoints')
@Controller('sessions')
export class SessionController {}
