import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { memoryStore } from 'cache-manager'

@Module({
	imports: [
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async () => ({
				// store: await redisStore({
				// 	password: CONFIG.REDIS_PASSWORD,
				// 	socket: {
				// 		host: CONFIG.REDIS_HOST,
				// 		port: Number(CONFIG.REDIS_PORT)
				// 	}
				// })
				store: memoryStore
			})
		})
	]
})
export class CacheModuleProvider {}
