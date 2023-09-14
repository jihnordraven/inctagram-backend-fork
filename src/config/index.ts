import { ConfigModule } from '@nestjs/config'
import process from 'process'

export const CONFIG = {
	START_MODULE: ConfigModule.forRoot({ isGlobal: true }),

	PORT: process.env.PORT,
	HOST: process.env.HOST,
	FRONTEND_HOST: process.env.FRONTEND_HOST,

	NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
	NODEMAILER_USER: process.env.NODEMAILER_USER,
	NODEMAILER_PASS: process.env.NODEMAILER_PASS,

	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,

	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES
}
