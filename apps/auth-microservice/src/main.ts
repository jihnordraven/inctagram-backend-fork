import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, Logger, RequestMethod, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import { blue, red } from 'colorette'
import { ConfigService } from '@nestjs/config'
import { validatePipeOptions } from '../helpers/error-handlers'
import { swaggerSetup } from '../libs/static/swagger/swagger-setup'
import { StatusEnum } from '../helpers/enums'

const appSettings = async (logger: Logger): Promise<void> => {
	const app = await NestFactory.create<INestApplication>(AppModule)

	app.setGlobalPrefix('api', {
		exclude: [{ path: '', method: RequestMethod.GET }]
	})
	app.enableCors({ credentials: true })
	app.use(cookieParser())

	useContainer(app.select(AppModule), { fallbackOnErrors: true })
	app.useGlobalPipes(new ValidationPipe(validatePipeOptions))
	// app.useGlobalFilters(new HttpExceptionFilter())

	const config = app.get(ConfigService) as ConfigService

	const PORT: string = config.get<string>('PORT')
	const HOST: string = config.get<string>('HOST')
	const STATUS: string = config.get<string>('STATUS')

	if (STATUS !== StatusEnum.PRODUCTION) swaggerSetup(app)

	await app.listen(PORT)

	logger.log(blue(`Server is running on ${HOST} with status:${STATUS}`))
}

async function bootstrap(): Promise<void> {
	const logger: Logger = new Logger(bootstrap.name)
	try {
		await appSettings(logger)
	} catch (err: unknown) {
		logger.log(red(`Something went wrong... Learn more at: ${err}`))
	}
}

bootstrap()
