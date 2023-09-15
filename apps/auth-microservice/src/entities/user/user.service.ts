import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.reposiroty'
import { User } from '@prisma/client'
import * as schedule from 'node-schedule'

@Injectable()
export class UserService {
	private scheduledJobs: Record<string, schedule.Job> = {}

	constructor(private readonly userRepository: UserRepository) {}

	public async createScheduledDeletion({
		userID
	}: {
		userID: string
	}): Promise<void | null> {
		const user: User = await this.userRepository.findUserById({ userID })
		if (user.isConfirmed) {
			return null
		} else {
			const delay: number = 15 * 60 * 1000

			const scheduledJob: schedule.Job = schedule.scheduleJob(
				new Date(Date.now() + delay),
				async (): Promise<void> => {
					await this.userRepository.deleteUser({ userID })
				}
			)
			this.scheduledJobs[userID] = scheduledJob
		}
	}

	public async cancelScheduledDeletion({ userID }: { userID: string }): Promise<void> {
		const scheduledJob: schedule.Job = this.scheduledJobs[userID]

		if (scheduledJob) {
			scheduledJob.cancel()
			delete this.scheduledJobs[userID]
		}
	}
}
