import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './swagger-config'

export const swaggerSetup = (app: INestApplication): void => {
	const options = swaggerConfig.development
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/swagger', app, document, {
		customCssUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
		]
	})
}
