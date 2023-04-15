import { createUserHandler } from '../handler'
import { userRepository } from '../repositories/contracts/userRepository'
import { TUser } from '../types'
import { fieldsReturn, validator } from '../validators/contracts/validator'

describe('CreateUserHandler', () => {
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
      getUsers: async () => {
        throw new Error('Function not implemented.')
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
  it('should be able to create an user', async () => {
    // setup

    // act
    await createUserHandler(userMock, userRepository, fieldValidator)

    // expectation
    const userExpectation = users[0]
    expect(userExpectation).toHaveProperty('id')
    expect(userExpectation).toHaveProperty('name')
    expect(userExpectation).toHaveProperty('password')
    expect(userExpectation).toHaveProperty('email')
    expect(userExpectation.id).toBe('some-id')
    expect(userExpectation.email).toBe('some-email')
    expect(userExpectation.name).toBe('some-name')
    expect(userExpectation.password).toBe('some-password')
  })

  it('should not create an user without required params', async () => {
    const failedUserPayload = {} as TUser

    const error = async () =>
      await createUserHandler(failedUserPayload, userRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })

  it('should not create an user with email already registered', async () => {
    await createUserHandler(userMock, userRepository, fieldValidator)

    jest.spyOn(userRepository, 'emailExists').mockResolvedValueOnce(true)

    const error = async () =>
      await createUserHandler(userMock, userRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 409,
        message: 'E-mail já cadastrado',
      })
    }
  })
  it('should not create a user with id already registered', async () => {
    jest.spyOn(userRepository, 'idExists').mockResolvedValueOnce(true)

    const error = async () =>
      await createUserHandler(userMock, userRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 409,
        message: 'Id já cadastrado',
      })
    }
  })
})
