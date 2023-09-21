import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FilesModule } from './files.module'
import { RmqService } from '../../../libs/common/src/rmq/rmq.service'
import { red } from 'colorette'

type BootstrapType = () => void

const bootstrap: BootstrapType = async (): Promise<void> => {
	const logger: Logger = new Logger(bootstrap.name)

	try {
		const app = await NestFactory.create<INestApplication>(FilesModule)
		const rmqService: RmqService = app.get<RmqService>(RmqService)
		app.connectMicroservice(rmqService.getOptions({ queue: 'MAIN', noAck: true }))

		await app.startAllMicroservices()
		logger.log('Microservice started with status 200')

		await app.listen(4300)
	} catch (err: unknown) {
		logger.error(red(`Microservice started with status 500. Learn more at: ${err}`))
	}
}

bootstrap()
