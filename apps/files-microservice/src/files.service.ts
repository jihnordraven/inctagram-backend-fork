import { Injectable, Logger } from '@nestjs/common'
import { UploadAvatarType } from './types'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FilesService {
	constructor(private readonly config: ConfigService) {}

	private readonly logger: Logger = new Logger()
	private readonly s3Client: S3Client = new S3Client({
		region: this.config.get<string>('AWS_S3_REGION')
	})

	public async uploadAvatar(data: UploadAvatarType): Promise<void> {
		const buffer: Buffer = Buffer.from(data.buffer.data)

		try {
			this.s3Client.send(
				new PutObjectCommand({
					Bucket: 'flying-merch-bucket',
					Key: data.filename,
					Body: buffer
				})
			)
		} catch (e) {
			this.logger.error('Unable to upload an avatar')
		}

		this.logger.log('Avatar uploaded')
	}
}
