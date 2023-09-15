export class GenerateTokensCommand {
	constructor(
		public readonly dto: { userID: string; userIP: string; userAgent: string }
	) {}
}
