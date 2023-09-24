import { Github2Guard } from './github2.guard'
import { GoogleGurad } from './google.guard'
import { JwtAccessGuard } from './jwt-access.guard'
import { JwtRefreshGuard } from './jwt-refresh.guard'
import { LocalAuthGuard } from './local.guard'

export * from './local.guard'
export * from './jwt-access.guard'
export * from './jwt-refresh.guard'
export * from './google.guard'
export * from './github2.guard'

export const GUARDS = [
	LocalAuthGuard,
	JwtAccessGuard,
	JwtRefreshGuard,
	GoogleGurad,
	Github2Guard
]
