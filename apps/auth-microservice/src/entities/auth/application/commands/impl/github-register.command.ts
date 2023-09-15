import { Response } from 'express'
import { GithubRegisterDTO } from '../../../core/dtos'

export class GithubRegisterCommand {
	constructor(public readonly dto: GithubRegisterDTO, public readonly res: Response) {}
}
