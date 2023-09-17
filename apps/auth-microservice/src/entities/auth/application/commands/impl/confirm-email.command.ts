import { ConfirmEmailType } from '../../../core/types'

export class ConfirmEmailCommand {
	constructor(public readonly dto: ConfirmEmailType) {}
}
