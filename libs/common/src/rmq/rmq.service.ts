import { Injectable } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'
import { CONFIG } from 'libs/common/src/config'

type RmqGetOptions = {
	readonly queue: string
	readonly noAck: boolean
}

type RmqAckType = {
	readonly context: RmqContext
}

@Injectable()
export class RmqService {
	public getOptions(data: RmqGetOptions): RmqOptions {
		const url: string = process.env.RMQ_HOST_URL
		return {
			transport: Transport.RMQ,
			options: {
				urls: [url],
				queue: data.queue,
				noAck: data.noAck ?? false,
				persistent: true
			}
		}
	}

	public ack(data: RmqAckType): void {
		const channel = data.context.getChannelRef()
		const originMessage = data.context.getMessage()
		channel.ack(originMessage)
	}
}
