import { JwtAccessGuard } from './jwt-access.guard'
import { JwtRefreshGuard } from './jwt-refresh.guard'
import { LocalGuard } from './local.guard'

export * from './local.guard'
export * from './jwt-access.guard'
export * from './jwt-refresh.guard'

export const GUARDS = [LocalGuard, JwtAccessGuard, JwtRefreshGuard]
