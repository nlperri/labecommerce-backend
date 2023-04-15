import { createUserHandler, editUserHandler } from '../handler'
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
  const editedUserMock = {
    email: 'some-new-email',
    name: 'some-new-name',
    password: 'some-new-password',
    id: userMock.id,
  }
  beforeEach(() => {
    userRepository = {
      getUsers: async () => {
        throw new Error('Function not implemented.')
      },
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

    await userRepository.editUser(editedUserMock)

    await editUserHandler(editedUserMock, userRepository, fieldValidator)

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
  it('should not edit an user if doesnt have any param', async () => {
    const emptyResponse = {} as TUser

    const error = async () =>
      await editUserHandler(emptyResponse, userRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })
  it('should not edit and user if id doesnt exist', async () => {
    jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(undefined)

    const error = () =>
      editUserHandler(userMock, userRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Usuário não encontrado',
      })
    }
  })
})
