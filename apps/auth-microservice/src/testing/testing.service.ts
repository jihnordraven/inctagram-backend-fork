import { Injectable } from '@nestjs/common'
import { UserRepository } from '../entities/user/user.reposiroty'
import { SessionRepository } from '../entities/session/session.repository'

@Injectable()
export class TestingService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly sessionRepository: SessionRepository
	) {}
	async deleteAllData() {
		await this.userRepository.deleteAllData()
		await this.sessionRepository.deleteAllData()
	}
}
