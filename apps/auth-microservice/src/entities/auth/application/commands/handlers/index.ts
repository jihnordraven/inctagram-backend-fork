import { ConfirmEmailHandler } from './confirm-email.handler'
import { GenerateTokensHandler } from './generate-tokens.handler'
import { GithubRegisterHandler } from './github-register.handler'
import { GoogleRegisterHandler } from './google-register.handler'
import { LocalRegisterHandler } from './local-register.handler'
import { LogoutHandler } from './logout.handler'
import { NewPasswordHandler } from './new-password.handler'
import { PasswordRecoveryHandler } from './password-recovery.handler'
import { ResendConfirmEmailHandler } from './resend-confirm-email.handler'

export * from './local-register.handler'
export * from './confirm-email.handler'
export * from './resend-confirm-email.handler'
export * from './password-recovery.handler'
export * from './new-password.handler'
export * from './generate-tokens.handler'
export * from './logout.handler'
export * from './google-register.handler'
export * from './github-register.handler'

export const AUTH_COMMANDS_HANDLERS = [
	LocalRegisterHandler,
	ConfirmEmailHandler,
	ResendConfirmEmailHandler,
	PasswordRecoveryHandler,
	NewPasswordHandler,
	GenerateTokensHandler,
	LogoutHandler,
	GoogleRegisterHandler,
	GithubRegisterHandler
]
