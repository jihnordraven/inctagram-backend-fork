import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Query
} from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { HelloPageHTML } from '../libs/static/templates'
import { CONFIG } from '../../../libs/common/src/config'
import { Public } from './decorators'
import { User } from '@prisma/client'

@Public()
@ApiTags('Basic endpoints (not available in production mode)')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public test(): string {
		return HelloPageHTML({ HOST: CONFIG.HOST })
	}

	@Post('db/seed')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: `Created a mock user (email: "email-[i]@mock.com",login: "login-[i]", password: "Password123%")`
	})
	public async seedDB(): Promise<User> {
		return this.appService.seedDB()
	}

	@Post('db/truncate')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'truncate table or tables' })
	@ApiParam({
		name: 'Table name in query params',
		type: String,
		examples: {
			'truncate users table': { value: 'user' },
			'truncate sessions table': { value: 'session' },
			'truncate email_codes table': { value: 'emailCode' },
			'truncate google_profiles table': { value: 'googleProfile' },
			'truncate github_profile table': { value: 'githubProfile' }
		}
	})
	public async truncateDB(@Query('table') table: string | null): Promise<void> {
		await this.appService.truncateDB(table)
	}
}
