import { JwtAccessStrategy } from './jwt-access.strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { LocalStrategy } from './local.strategy'

export * from './local.strategy'
export * from './jwt-access.strategy'
export * from './jwt-refresh.strategy'

export const STRATEGIES = [LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy]
