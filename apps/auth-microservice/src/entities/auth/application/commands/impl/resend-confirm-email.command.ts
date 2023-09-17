import { ResendConfirmEmailType } from '../../../core/types'

export class ResendConfirmEmailCommand {
	constructor(public readonly dto: ResendConfirmEmailType) {}
}
