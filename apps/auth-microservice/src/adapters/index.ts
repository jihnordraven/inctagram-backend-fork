import { Argon2Adapter } from './argon2.adapter'
import { MailerAdapter } from './mailer.adapter'

export * from './mailer.adapter'
export * from './argon2.adapter'

export const ADAPTERS = [MailerAdapter, Argon2Adapter]
