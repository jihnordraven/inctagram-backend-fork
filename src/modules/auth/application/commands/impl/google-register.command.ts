import { GoogleRegisterDTO } from 'src/modules/auth/core/dtos'

export class GoogleRegisterCommand {
	constructor(public readonly dto: GoogleRegisterDTO) {}
}
