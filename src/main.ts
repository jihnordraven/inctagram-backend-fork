import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import { blue, red } from 'colorette'
import { ConfigService } from '@nestjs/config'
import { StatusEnum } from 'src/helpers/enums'
import { HttpExceptionFilter, validatePipeOptions } from 'src/helpers/error-handlers'
import { swaggerSetup } from 'src/libs/swagger/swagger-setup'

const appSettings = async (logger: Logger): Promise<void> => {
	const app = await NestFactory.create<INestApplication>(AppModule)

	app.setGlobalPrefix('api')
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

	logger.log(blue(`Server is running on ${HOST}:${PORT} in status:${STATUS}`))
}

async function bootstrap(): Promise<void> {
	const logger: Logger = new Logger(bootstrap.name)
	try {
		appSettings(logger)
	} catch (err: unknown) {
		logger.log(red(`Something went wrong... Learn more at: ${err}`))
	}
}

bootstrap()
