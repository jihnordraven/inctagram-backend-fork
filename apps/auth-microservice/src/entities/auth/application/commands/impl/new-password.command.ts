import { NewPasswordType } from '../../../core/types'

export class NewPasswordCommand {
	constructor(public readonly dto: NewPasswordType) {}
}
