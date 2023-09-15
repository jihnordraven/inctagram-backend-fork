import { RegistrationDTO } from '../../../core/dtos'

export class LocalRegisterCommand {
	constructor(public readonly dto: RegistrationDTO) {}
}
