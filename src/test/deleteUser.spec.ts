import { createUserHandler, deleteUserByIdHandler } from '../handler'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase, TPurchasesProducts, TUser } from '../types'
import { fieldsReturn, validator } from '../validators/contracts/validator'

describe('deleteUser', () => {
  let userRepository: userRepository
  let fieldValidator: validator
  let purchaseRepository: purchaseRepository
  let users: TUser[] = []
  let purchases: TPurchase[] = []
  let purchasesProducts: TPurchasesProducts[] = []
  const userMock = {
    email: 'some-email',
    name: 'some-name',
    id: 'some-id',
    password: 'some-password',
  }

  const purchaseMock = {
    userId: 'some-user-purchase-id',
    id: 'some-purhcase-id',
    paid: 1,
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
      getPurchases: async function () {
        throw new Error('Function not implemented.')
      },
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
      deletePurchaseById: async function (id: string): Promise<void> {
        const index = purchases.findIndex((purchases) => purchases.id === id)
        purchases.splice(index, 1)
      },
      deletePurchaseFromPurchasesProducts: async function (
        id: string
      ): Promise<void> {
        const index = purchasesProducts.findIndex(
          (purchaseProduct) => purchaseProduct.purchaseId === id
        )
        purchasesProducts.splice(index, 1)
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
  it('should not be able to delete user if id doesnt exist', async () => {
    jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(undefined)

    const error = () =>
      deleteUserByIdHandler(userMock.id, userRepository, purchaseRepository)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Usuário não encontrado',
      })
    }
  })
  it('should delete user if has any purchases', async () => {
    await createUserHandler(userMock, userRepository, fieldValidator)

    jest
      .spyOn(purchaseRepository, 'getUserPurchases')
      .mockResolvedValueOnce([purchaseMock])

    await deleteUserByIdHandler(userMock.id, userRepository, purchaseRepository)

    const userExpectation = users

    expect(userExpectation).toStrictEqual([])
  })
})
