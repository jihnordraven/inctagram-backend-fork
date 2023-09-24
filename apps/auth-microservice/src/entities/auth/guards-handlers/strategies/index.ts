import { Github2Strategy } from './github2.strategy'
import { GoogleStrategy } from './google.strategy'
import { JwtAccessStrategy } from './jwt-access.strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { LocalAuthStrategy } from './local.strategy'

export * from './local.strategy'
export * from './jwt-access.strategy'
export * from './jwt-refresh.strategy'
export * from './google.strategy'
export * from './github2.strategy'

export const STRATEGIES = [
	LocalAuthStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	GoogleStrategy,
	Github2Strategy
]
