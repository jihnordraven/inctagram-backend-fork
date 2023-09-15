import { Response } from 'express'
import { GithubRegisterDTO } from 'src/modules/auth/core/dtos'

export class GithubRegisterCommand {
	constructor(public readonly dto: GithubRegisterDTO, public readonly res: Response) {}
}
