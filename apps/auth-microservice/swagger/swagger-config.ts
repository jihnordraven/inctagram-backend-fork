import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = {
	development: new DocumentBuilder()
		.setTitle('Flying Merch. Auth API')
		.setDescription('Descriptions of auth endpoints')
		.setVersion('1.0')
		.build()
}
