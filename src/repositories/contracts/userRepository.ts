import { TUser } from '../../types'

export interface userRepository {
  idExists: (id: string) => Promise<boolean>
  emailExists: (email: string) => boolean
  create: (user: TUser) => Promise<void>
  getUserById: (id: string) => Promise<TUser[] | []>
  deleteUser: (id: string) => Promise<void>
  editUser: (user: TUser) => Promise<void>
}
