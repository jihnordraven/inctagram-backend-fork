import { Transform } from 'class-transformer'

export const TrimValidate = (): PropertyDecorator => {
	return Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
}
