import { TUser } from '../../types'

export interface userRepository {
  idExists: (id: string) => boolean
  emailExists: (email: string) => boolean
  create: (user: TUser) => void
  getUserById: (id: string) => TUser | undefined
  deleteUser: (id: string) => void
}
