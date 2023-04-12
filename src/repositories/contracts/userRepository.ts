import { TUser } from '../../types'

export interface userRepository {
  idExists: (id: string) => Promise<boolean>
  emailExists: (email: string) => Promise<boolean>
  create: (user: TUser) => Promise<void>
  getUserById: (id: string) => Promise<TUser | undefined>
  deleteUser: (id: string) => Promise<void>
  deleteUserFromPurchases: (id: string) => Promise<void>
  editUser: (user: TUser) => Promise<void>
}
