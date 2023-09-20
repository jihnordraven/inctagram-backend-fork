import { EditProfileCommand } from './edit-profile.command'
import { EditAvatarCommand } from './edit-avatar.command'

export * from './edit-profile.command'
export * from './edit-avatar.command'

export const USERS_COMMANDS_IMPLS = { EditProfileCommand, EditAvatarCommand }
