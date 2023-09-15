import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	public test(): string {
		return 'Server works with status 200. Learn more about API at /api/swagger'
	}

	@Get()
	public async truncateDB(): Promise<void> {
		await this.appService.truncateDB()
	}
}
