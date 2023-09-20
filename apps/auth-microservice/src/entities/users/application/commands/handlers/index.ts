import { EditAvatarHandler } from './edit-avatar.handler'
import { EditProfileHandler } from './edit-profile.handler'

export * from './edit-profile.handler'
export * from './edit-avatar.handler'

export const USERS_COMMANDS_HANDLERS = [EditProfileHandler, EditAvatarHandler]
