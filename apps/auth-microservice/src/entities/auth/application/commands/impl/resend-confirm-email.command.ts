export class ResendConfirmEmailCommand {
	constructor(public readonly dto: { code: string }) {}
}
