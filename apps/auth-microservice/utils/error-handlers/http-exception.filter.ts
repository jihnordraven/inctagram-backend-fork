import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response: Response = ctx.getResponse<Response>()
		const request: Request = ctx.getRequest<Request>()
		const status: number = exception.getStatus()

		if (status === 400) {
			let errorResponses = {
				errorsMessages: []
			}
			const responseBody: any = exception.getResponse()
			responseBody.message.forEach((item) =>
				errorResponses.errorsMessages.push(item)
			)
			return response.status(status).json(errorResponses)
		} else {
			response.status(status).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url
			})
		}
	}
}
