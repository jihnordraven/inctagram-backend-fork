import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 10,
			limit: 500
		})
	]
})
export class ThrottelModuleProvider {}
