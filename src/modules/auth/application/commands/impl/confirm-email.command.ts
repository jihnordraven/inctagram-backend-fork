import { Response } from 'express'

export class ConfirmEmailCommand {
	constructor(public readonly dto: { res: Response; code: string }) {}
}
