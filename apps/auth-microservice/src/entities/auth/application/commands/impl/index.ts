import { ConfirmEmailCommand } from './confirm-email.command'
import { GenerateTokensCommand } from './generate-tokens.command'
import { GithubRegisterCommand } from './github-register.command'
import { GoogleRegisterCommand } from './google-register.command'
import { LocalRegisterCommand } from './local-register.command'
import { LogoutCommand } from './logout.command'
import { NewPasswordCommand } from './new-password.command'
import { PasswordRecoveryCommand } from './password-recovery.command'
import { ResendConfirmEmailCommand } from './resend-confirm-email.command'

export * from './local-register.command'
export * from './confirm-email.command'
export * from './resend-confirm-email.command'
export * from './password-recovery.command'
export * from './new-password.command'
export * from './generate-tokens.command'
export * from './logout.command'
export * from './google-register.command'
export * from './github-register.command'

export const AUTH_COMMAND_IMPLS = {
	LocalRegisterCommand,
	ConfirmEmailCommand,
	ResendConfirmEmailCommand,
	PasswordRecoveryCommand,
	NewPasswordCommand,
	GenerateTokensCommand,
	LogoutCommand,
	GoogleRegisterCommand,
	GithubRegisterCommand
}
