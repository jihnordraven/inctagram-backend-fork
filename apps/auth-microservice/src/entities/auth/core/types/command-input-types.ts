import { Response } from 'express'

export type ConfirmEmailType = {
	readonly res: Response
	readonly code: string
}

export type GenerateTokensType = {
	readonly userID: string
	readonly userIP: string
	readonly userAgent: string
}

export type LogoutType = {
	readonly userID: string
	readonly sessionID: string
}

export type NewPasswordType = {
	readonly res: Response
	readonly code: string
	readonly newPassword: string
}

export type ResendConfirmEmailType = {
	readonly code: string
}
