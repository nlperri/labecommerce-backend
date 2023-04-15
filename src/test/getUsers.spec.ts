import { createUserHandler, getUsersHandler } from '../handler'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { fieldsReturn, validator } from '../validators/contracts/validator'

describe('getUsers', () => {
  let userRepository: userRepository
  let users: TUser[] = []
  let fieldValidator: validator
  const userMock = {
    email: 'some-email',
    name: 'some-name',
    id: 'some-id',
    password: 'some-password',
  }

  beforeEach(() => {
    userRepository = {
      getUsers: async () => {
        return users
      },
      idExists: async (id: string) => false,
      emailExists: async (email: string) => false,
      create: async (user: TUser) => {
        users.push(user)
      },
      getUserById: function (id: string): Promise<TUser | undefined> {
        throw new Error('Function not implemented.')
      },
      deleteUser: function (id: string): Promise<void> {
        throw new Error('Function not implemented.')
      },
      deleteUserFromPurchases: function (id: string): Promise<void> {
        throw new Error('Function not implemented.')
      },
      editUser: function (user: TUser): Promise<void> {
        throw new Error('Function not implemented.')
      },
    }
    fieldValidator = {
      isFieldsNumbers: function (fields): fieldsReturn {
        return {
          isValid: true,
        }
      },
      isFieldsStrings: function (fields): fieldsReturn {
        return {
          isValid: true,
        }
      },
    }
  })
  afterEach(() => {
    users = []
  })

  it('should be able to list all users', async () => {
    await createUserHandler(userMock, userRepository, fieldValidator)

    const returnedUsers = await getUsersHandler(userRepository)

    const userExpectation = users

    expect(returnedUsers).toEqual(userExpectation)
  })
})
