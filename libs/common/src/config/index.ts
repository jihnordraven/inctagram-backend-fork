import process from 'process'

export const CONFIG = {
	// node
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	MODE: process.env.MODE,
	FRONTEND_HOST: process.env.FRONTEND_HOST,

	// nodemailer
	NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
	NODEMAILER_USER: process.env.NODEMAILER_USER,
	NODEMAILER_PASS: process.env.NODEMAILER_PASS,

	// jwt
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,

	// google oauth
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

	// github oauth
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,

	// reds
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,

	// aws-s3
	AWS_S3_REGION: process.env.AWS_S3_REGION,
	AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,

	// rabbitmq
	RMQ_HOST_URL: process.env.RMQ_HOST_URL
}
