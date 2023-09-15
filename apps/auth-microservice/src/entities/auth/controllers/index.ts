import { AuthGithubController } from './auth-github.controller'
import { AuthGoogleController } from './auth-google.controller'
import { AuthController } from './auth.controller'

export const AUTH_CONTROLLERS = [
	AuthController,
	AuthGoogleController,
	AuthGithubController
]
