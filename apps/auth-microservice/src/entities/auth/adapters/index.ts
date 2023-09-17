import { Argon2Adapter } from './argon2.adapter'
import { MailerAdapter } from './mailer.adapter'

export * from './mailer.adapter'
export * from './argon2.adapter'

export const AUTH_ADAPTERS = [MailerAdapter, Argon2Adapter]
