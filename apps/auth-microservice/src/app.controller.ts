import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { Public } from './decorators'

@ApiTags('Basic API')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	@HttpCode(HttpStatus.OK)
	public test(): string {
		return 'Server works with status 200. Learn more about API at /api/swagger'
	}

	@Public()
	@Post('db/seed')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async seedDB(): Promise<void> {
		await this.appService.seedDB()
	}

	@Public()
	@Post('db/truncate')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async truncateDB(): Promise<void> {
		await this.appService.truncateDB()
	}
}
