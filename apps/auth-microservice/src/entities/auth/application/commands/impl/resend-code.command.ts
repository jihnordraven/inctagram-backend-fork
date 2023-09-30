import { ResendConfirmEmailType } from '../../../core/types'

export class ResendCodeCommand {
	constructor(public readonly dto: ResendConfirmEmailType) {}
}
