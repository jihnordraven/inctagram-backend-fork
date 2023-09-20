export class EditAvatarCommand {
	constructor(public readonly dto: { file: Express.Multer.File; userID: string }) {}
}
