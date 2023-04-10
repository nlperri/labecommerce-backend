import { TUser } from '../../types'

export interface userRepository {
  idExists: (id: string) => Promise<boolean>
  emailExists: (email: string) => boolean
  create: (user: TUser) => Promise<void>
  getUserById: (id: string) => TUser | undefined
  deleteUser: (id: string) => void
}
