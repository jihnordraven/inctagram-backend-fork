import { PasswordRecoveryDTO } from '../../../core/dtos'

export class PasswordRecoveryCommand {
	constructor(public readonly dto: PasswordRecoveryDTO) {}
}
