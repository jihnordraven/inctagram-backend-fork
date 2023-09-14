import { Response } from 'express'

export class NewPasswordCommand {
	constructor(
		public readonly dto: { res: Response; code: string; newPassword: string }
	) {}
}
