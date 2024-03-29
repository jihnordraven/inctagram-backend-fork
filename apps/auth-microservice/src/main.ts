import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, Logger, RequestMethod, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import { blue, red } from 'colorette'
import { ConfigService } from '@nestjs/config'
import { swaggerSetup } from '../static/swagger/swagger-setup'
import { StatusEnum } from '../utils/enums'
import { validatePipeOptions } from '../utils/error-handlers'

type AppSettingsType = (logger: Logger) => Promise<void>
type BootstrapType = () => Promise<void>

const appSettings: AppSettingsType = async (logger: Logger): Promise<void> => {
	const app: INestApplication = await NestFactory.create<INestApplication>(AppModule)

	app.setGlobalPrefix('api', {
		exclude: [{ path: '', method: RequestMethod.GET }]
	})
	app.enableCors({
		origin: [
			'http://localhost:3000',
			'https://flying-merch-front.vercel.app',
			'https://freedomindz.site'
		],
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']
	})
	app.use(cookieParser())

	useContainer(app.select(AppModule), { fallbackOnErrors: true })
	app.useGlobalPipes(new ValidationPipe(validatePipeOptions))
	// app.useGlobalFilters(new HttpExceptionFilter())

	const config = app.get(ConfigService) as ConfigService

	const PORT: string = config.get<string>('PORT')
	const HOST: string = config.get<string>('HOST')
	const MODE: string = config.get<string>('MODE')

	if (MODE !== StatusEnum.PRODUCTION) swaggerSetup(app)

	await app.listen(4200)

	logger.log(blue(`Server is running on ${HOST} in ${MODE} mode`))
}

const bootstrap: BootstrapType = async (): Promise<void> => {
	const logger: Logger = new Logger(bootstrap.name)
	try {
		await appSettings(logger)
	} catch (err: unknown) {
		logger.log(red(`Something went wrong... Learn more at: ${err}`))
	}
}

bootstrap()
