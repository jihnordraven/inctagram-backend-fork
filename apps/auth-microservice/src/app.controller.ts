import { Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { HelloPageHTML } from '../libs/static/templates'
import { CONFIG } from '../libs/config'
import { Public } from './decorators'

@ApiTags('Basic API')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	@HttpCode(HttpStatus.OK)
	public test(): string {
		return HelloPageHTML({ HOST: CONFIG.HOST })
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
	public async truncateDB(@Query('table') table: string): Promise<void> {
		await this.appService.truncateDB(table)
	}
}
