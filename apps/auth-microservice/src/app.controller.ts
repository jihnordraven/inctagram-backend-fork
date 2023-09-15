import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Basic API')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public test(): string {
		return 'Server works with status 200. Learn more about API at /api/swagger'
	}

	@Post('db/seed')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async seedDB(): Promise<void> {
		await this.appService.seedDB()
	}

	@Post('db/truncate')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async truncateDB(): Promise<void> {
		await this.appService.truncateDB()
	}
}
