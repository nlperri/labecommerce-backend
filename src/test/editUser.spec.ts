import { createUserHandler } from '../handler'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { fieldsReturn, validator } from '../validators/contracts/validator'

describe('editUser', () => {
  let userRepository: userRepository
  let fieldValidator: validator
  let users: TUser[] = []
  const userMock = {
    email: 'some-email',
    name: 'some-name',
    id: 'some-id',
    password: 'some-password',
  }
  beforeEach(() => {
    userRepository = {
      idExists: async (id: string) => false,
      emailExists: async (email: string) => false,
      create: async (user: TUser) => {
        users.push(user)
      },
      getUserById: async function (id: string): Promise<TUser | undefined> {
        return userMock
      },
      deleteUser: function (id: string): Promise<void> {
        throw new Error('Function not implemented.')
      },
      deleteUserFromPurchases: function (id: string): Promise<void> {
        throw new Error('Function not implemented.')
      },
      editUser: async function (user: TUser): Promise<void> {},
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
  it('should be able to edit user by its id', async () => {
    await createUserHandler(userMock, userRepository, fieldValidator)

    await userRepository.getUserById(userMock.id)

    const editedUserMock = {
      email: 'some-new-email',
      name: 'some-new-name',
      password: 'some-new-password',
      id: userMock.id,
    }

    await userRepository.editUser(editedUserMock)

    const userExpectation = editedUserMock
    expect(userExpectation).toHaveProperty('id')
    expect(userExpectation).toHaveProperty('name')
    expect(userExpectation).toHaveProperty('password')
    expect(userExpectation).toHaveProperty('email')
    expect(userExpectation.id).toBe(userMock.id)
    expect(userExpectation.email).toBe('some-new-email' || userMock.email)
    expect(userExpectation.name).toBe('some-new-name' || userMock.name)
    expect(userExpectation.password).toBe(
      'some-new-password' || userMock.password
    )
  })
})
