import { Module } from '@nestjs/common'
import { RmqService } from './rmq.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { CONFIG } from '../config'

type RmqModuleOptions = {
	readonly name: string
}

@Module({
	providers: [RmqService],
	exports: [RmqService]
})
export class RmqModule {
	static register({ name }: RmqModuleOptions) {
		return {
			module: RmqModule,
			imports: [
				ClientsModule.registerAsync([
					{
						name,
						useFactory: () => ({
							transport: Transport.RMQ,
							options: {
								urls: [CONFIG.RMQ_HOST_URL],
								queue: name
							}
						})
					}
				])
			],
			exports: [ClientsModule]
		}
	}
}
