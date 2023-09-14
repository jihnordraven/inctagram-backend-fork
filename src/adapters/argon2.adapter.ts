import { hash, verify } from 'argon2'

type HashInputType = {
	readonly password: string
}

type CompareInputType = {
	readonly password: string
	readonly hashPassword: string
}

export class Argon2Adapter {
	public async hash(data: HashInputType): Promise<string> {
		return hash(data.password)
	}

	public async verify(data: CompareInputType): Promise<boolean> {
		return verify(data.hashPassword, data.password)
	}
}
