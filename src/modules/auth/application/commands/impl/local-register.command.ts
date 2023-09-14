import { RegistrationDTO } from 'src/modules/auth/core/dtos'

export class LocalRegisterCommand {
	constructor(public readonly dto: RegistrationDTO) {}
}
