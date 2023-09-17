import { SwaggerMeType } from './swagger-me-type'
import { SwaggerEmailConfirmType } from './swagger-email-confirm-type'
import { SwaggerEmailResendType } from './swagger-email-resend-type'
import { SwaggerLocalRegisterType } from './swagger-local-register-type'
import { SwaggerLoginType } from './swagger-login-type'
import { SwaggerNewPasswordType } from './swagger-new-password-type'
import { SwaggerNewTokensType } from './swagger-new-tokens-type'
import { SwaggerPasswordRecoveryType } from './swagger-password-recovery-type'
import { SwaggerLogoutType } from './swagger-logout-type'

export * from './swagger-local-register-type'
export * from './swagger-email-resend-type'
export * from './swagger-login-type'
export * from './swagger-new-password-type'
export * from './swagger-password-recovery-type'
export * from './swagger-new-tokens-type'
export * from './swagger-email-confirm-type'
export * from './swagger-logout-type'
export * from './swagger-me-type'

export const AUTH_SWAGGER = {
	SwaggerLocalRegisterType,
	SwaggerEmailResendType,
	SwaggerLoginType,
	SwaggerNewPasswordType,
	SwaggerPasswordRecoveryType,
	SwaggerNewTokensType,
	SwaggerEmailConfirmType,
	SwaggerLogoutType,
	SwaggerMeType
}
