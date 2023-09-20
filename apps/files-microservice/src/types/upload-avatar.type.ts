export type UploadAvatarType = {
	readonly filename: string
	readonly buffer: {
		readonly type: string
		readonly data: number[]
	}
}
