import { getUserPurchasesHandler } from '../handler'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchase, TUser } from '../types'

describe('getUserPurchases', () => {
  let purchaseRepository: purchaseRepository
  let userRepository: userRepository

  const purchases: TPurchase[] = [
    {
      userId: 'user-id',
      id: 'purchase-id',
      paid: 0,
    },
  ]

  beforeEach(() => {
    purchaseRepository = {
      async getPurchases() {
        throw new Error('Function not implemented.')
      },
      async getUserPurchases() {
        return purchases
      },
      async create(purchase: TPurchase) {
        throw new Error('Function not implemented.')
      },
      async idExists(id: string) {
        return false
      },
      async getPurchaseById(id: string) {
        throw new Error('Function not implemented.')
      },
      async deletePurchaseById(id: string) {
        throw new Error('Function not implemented.')
      },
      async deletePurchaseFromPurchasesProducts(id: string) {
        throw new Error('Function not implemented.')
      },
      async createPurchasesProducts(
        id: string,
        productId: string,
        quantity: number
      ) {
        throw new Error('Function not implemented.')
      },
    }

    userRepository = {
      getUsers: async () => {
        throw new Error('Function not implemented.')
      },
      idExists: async (id: string) => true,
      emailExists: async (email: string) => {
        throw new Error('Function not implemented.')
      },
      create: async (user: TUser) => {
        throw new Error('Function not implemented.')
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
  })

  it('should list all user purchases', async () => {
    const returnedUserPurchases = await getUserPurchasesHandler(
      purchases[0].id,
      purchaseRepository,
      userRepository
    )

    const userPurchaseExpectation = purchases

    expect(returnedUserPurchases).toEqual(userPurchaseExpectation)
  })

  it('should not list user purchases if user id doesnt exist', async () => {
    jest.spyOn(userRepository, 'idExists').mockResolvedValueOnce(false)

    const error = async () =>
      await getUserPurchasesHandler(
        purchases[0].id,
        purchaseRepository,
        userRepository
      )

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Usuário não encontrado',
      })
    }
  })

  it('should not list user purchases if user doesnt have any purchase', async () => {
    jest.spyOn(purchaseRepository, 'getUserPurchases').mockResolvedValueOnce([])

    const error = async () =>
      await getUserPurchasesHandler(
        purchases[0].id,
        purchaseRepository,
        userRepository
      )

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Compra não encontrada',
      })
    }
  })
})
