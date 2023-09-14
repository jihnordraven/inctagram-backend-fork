import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = {
	development: new DocumentBuilder()
		.setTitle('Flying Merch')
		.setDescription('Flying merch API')
		.setVersion('1.0')
		.build()
}
