import { BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export const validatePipeOptions: object = {
	transform: true,
	stopAtFirstError: true,
	exceptionFactory: (errors: ValidationError[]) => {
		const errorsForResponse = []
		errors.forEach((err: ValidationError) => {
			const constrainedKeys = Object.keys(err.constraints)
			constrainedKeys.forEach((ckey) => {
				errorsForResponse.push({
					message: err.constraints[ckey],
					field: err.property
				})
			})
		})
		throw new BadRequestException(errorsForResponse)
	}
}
