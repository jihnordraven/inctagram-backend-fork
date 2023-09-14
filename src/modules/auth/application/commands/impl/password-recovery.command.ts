import { PasswordRecoveryDTO } from 'src/modules/auth/core/dtos'

export class PasswordRecoveryCommand {
	constructor(public readonly dto: PasswordRecoveryDTO) {}
}
