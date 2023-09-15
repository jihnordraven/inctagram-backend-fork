import { Controller } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'

@Controller('security/devices')
export class SessionController {
	constructor() {}

	// @SkipThrottle()
	// @UseGuards(RefreshTokenAuthGuard)
	// @Delete()
	// @HttpCode(HttpStatus.NO_CONTENT)
	// async deleteAllOtherDevices(
	// 	@Req() req: Request,
	// 	@Res({ passthrough: true }) res: Response
	// ) {
	// 	const refreshToken: string = req.cookies.refreshToken
	// 	console.log(refreshToken, ' refreshToken in deleteAllOtherDevices')
	// 	const refreshTokenPayload: any = this.jwtService.decode(refreshToken)
	// 	console.log(refreshTokenPayload, '  refreshTokenPayload in deleteAllOtherDevices')
	// 	const deviceIdFromRefreshToken: string = refreshTokenPayload!.deviceId
	// 	console.log(
	// 		deviceIdFromRefreshToken,
	// 		' deviceIdFromRefreshToken in deleteAllOtherDevices'
	// 	)
	// 	const userIdFromRefreshToken: string = refreshTokenPayload!.userId
	// 	await this.securityDevicesRepository.deleteAllDevicesExcludeCurrentDB(
	// 		userIdFromRefreshToken,
	// 		deviceIdFromRefreshToken
	// 	)
	// 	return
	// }
}
