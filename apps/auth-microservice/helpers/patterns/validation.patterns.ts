type PasswordPatternType = () => RegExp
type EmailPatternType = () => RegExp
type LoginPatternType = () => RegExp

export const PasswordPattern: PasswordPatternType = (): RegExp =>
	/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/]+$/

export const EmailPattern: EmailPatternType = (): RegExp =>
	/^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/

export const LoginPattern: LoginPatternType = (): RegExp => /^[a-zA-Z0-9_-]*$/
