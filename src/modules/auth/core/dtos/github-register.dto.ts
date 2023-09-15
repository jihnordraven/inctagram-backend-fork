export class GithubRegisterDTO {
	readonly login: string
	readonly node_id: string
	readonly avatar_url?: string | null
	readonly name?: string | null
	readonly email?: string | null
}
