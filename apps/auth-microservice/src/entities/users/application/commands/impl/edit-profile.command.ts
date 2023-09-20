import { EditProfileDTO } from '../../../core/dtos'

export class EditProfileCommand {
	constructor(public readonly dto: EditProfileDTO, public readonly userID: string) {}
}
