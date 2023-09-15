export class LogoutCommand {
	constructor(public readonly dto: { userID: string; sessionID: string }) {}
}
