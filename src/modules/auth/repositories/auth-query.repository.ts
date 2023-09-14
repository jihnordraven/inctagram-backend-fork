import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { JwtAccessPayload } from '../protection/strategies'
import { User } from '@prisma/client'
import { GetMeType } from '../core/types'

@Injectable()
export class AuthQueryRepository {
	constructor(private readonly prisma: PrismaService) {}

	public async getMe(payload: JwtAccessPayload): Promise<GetMeType> {
		const user: User | null = await this.prisma.user.findUnique({
			where: { id: payload.userID }
		})
		if (!user) throw new NotFoundException('User not found')
		return {
			userID: user.id,
			email: user.email,
			login: user.login,
			createdAt: user.createdAt
		}
	}
}
