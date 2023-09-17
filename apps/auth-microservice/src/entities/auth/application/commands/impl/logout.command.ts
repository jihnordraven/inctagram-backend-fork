import { LogoutType } from '../../../core/types'

export class LogoutCommand {
	constructor(public readonly dto: LogoutType) {}
}
