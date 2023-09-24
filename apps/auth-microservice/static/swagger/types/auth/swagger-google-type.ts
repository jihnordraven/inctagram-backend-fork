import { applyDecorators } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

export const SwaggerGoogleType = (): MethodDecorator => {
	return applyDecorators(ApiOperation({ summary: 'Open google authentication page' }))
}
