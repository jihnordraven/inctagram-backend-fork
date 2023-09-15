export const PasswordPattern: () => RegExp = () =>
	/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/]+$/

export const EmailPattern: () => RegExp = () =>
	/^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/

export const LoginPattern: () => RegExp = () => /^[a-zA-Z0-9_-]*$/
