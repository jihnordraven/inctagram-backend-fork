import { CONFIG } from '../../../../../../libs/common/src/config'
import { emailConfirmHTML, passwordRecoveryHTML } from '../../../../libs/static/templates'
import { SendMailOptions, Transporter, createTransport } from 'nodemailer'

type SendMailType = {
	readonly email: string
	readonly code: string
}

export class MailerAdapter {
	private async options(options: SendMailOptions): Promise<void> {
		const transporter: Transporter = createTransport({
			service: CONFIG.NODEMAILER_SERVICE,
			auth: {
				user: CONFIG.NODEMAILER_USER,
				pass: CONFIG.NODEMAILER_PASS
			}
		})
		await transporter.sendMail(options)
	}

	public async sendEmailCode(data: SendMailType): Promise<void> {
		await this.options({
			to: data.email,
			from: CONFIG.NODEMAILER_USER,
			subject: 'Email confirmation',
			html: emailConfirmHTML({ HOST: CONFIG.HOST, code: data.code })
		})
	}

	public async sendPasswordCode(data: SendMailType): Promise<void> {
		await this.options({
			to: data.email,
			from: CONFIG.NODEMAILER_USER,
			subject: 'Password recovery',
			html: passwordRecoveryHTML({ HOST: CONFIG.HOST, code: data.code })
		})
	}
}
