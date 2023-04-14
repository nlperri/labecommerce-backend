import { createUserHandler, deleteUserByIdHandler } from '../handler'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase, TUser } from '../types'
import { fieldsReturn, validator } from '../validators/contracts/validator'

describe('deleteUser', () => {
  let userRepository: userRepository
  let fieldValidator: validator
  let purchaseRepository: purchaseRepository
  let users: TUser[] = []
  let purchases: TPurchase[] = []

  const userMock = {
    email: 'some-email',
    name: 'some-name',
    id: 'some-id',
    password: 'some-password',
  }

  const purchaseMock = {
    userId: 'some-user-purchase-id',
    id: 'some-id',
    paid: 1,
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
      deleteUser: async function (id: string): Promise<void> {
        const index = users.findIndex((user) => user.id === id)
        users.splice(index, 1)
      },
      deleteUserFromPurchases: function (id: string): Promise<void> {
        const index = purchases.findIndex((purchase) => purchase.userId === id)
        purchases.splice(index, 1)
        return Promise.resolve(undefined)
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
    purchaseRepository = {
      getUserPurchases: async function (
        userId: string
      ): Promise<TPurchase[] | []> {
        return []
      },
      create: async function (purchase: TPurchase): Promise<void> {
        purchases.push(purchaseMock)
      },
      idExists: async function (id: string): Promise<boolean> {
        throw new Error('Function not implemented.')
      },
      getPurchaseById: async function (id: string): Promise<any> {
        throw new Error('Function not implemented.')
      },
      deletePurchaseById: async function (id: string): Promise<void> {},
      deletePurchaseFromPurchasesProducts: async function (
        id: string
      ): Promise<void> {
        throw new Error('Function not implemented.')
      },
      createPurchasesProducts: async function (
        id: string,
        productId: string,
        quantity: number
      ): Promise<void> {
        throw new Error('Function not implemented.')
      },
    }
  })
  afterEach(() => {
    users = []
  })
  it('should be able to delete user by its id', async () => {
    await createUserHandler(userMock, userRepository, fieldValidator)

    await deleteUserByIdHandler(userMock.id, userRepository, purchaseRepository)

    const userExpectation = users

    expect(userExpectation).toStrictEqual([])
  })
})
