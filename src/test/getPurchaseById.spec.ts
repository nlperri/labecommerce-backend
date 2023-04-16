import { getPurchaseByIdHandle } from '../handler/getPurchaseByIdHandle'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { TPurchase } from '../types'

describe('getPurchaseById', () => {
  let purchaseRepository: purchaseRepository

  const purchaseMock: TPurchase = {
    userId: 'user-id',
    id: 'purchase-id',
    paid: 0,
  }

  const formattedPurchaseResult = {
    purchaseId: 'purchase-id',
    totalPrice: 10,
    createdAt: 'some-date',
    isPaid: !!1,
    buyerId: 'some-user-id',
    email: 'some-email',
    name: 'some-name',
    productsList: [
      {
        id: 'some- product-id',
        name: 'some-product-name',
        price: 12,
        description: 'some-description',
        imageUrl: 'some-url',
      },
    ],
  }
  beforeEach(() => {
    purchaseRepository = {
      async getPurchases() {
        throw new Error('Function not implemented.')
      },
      async getUserPurchases() {
        throw new Error('Function not implemented.')
      },
      async create(purchase: TPurchase) {
        throw new Error('Function not implemented.')
      },
      async idExists(id: string) {
        return true
      },
      async getPurchaseById(id: string) {
        return formattedPurchaseResult
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
  })

  it('should list a formatted purchase summary with user and products info by purchase id', async () => {
    const returnedPurchase = await getPurchaseByIdHandle(
      purchaseMock.id,
      purchaseRepository
    )

    const purchaseExpectation = formattedPurchaseResult

    expect(returnedPurchase).toEqual(purchaseExpectation)
  })

  it('should not list purchase summary if purchase id doesnt exist', async () => {
    jest.spyOn(purchaseRepository, 'idExists').mockResolvedValueOnce(false)

    const error = async () =>
      await getPurchaseByIdHandle(purchaseMock.id, purchaseRepository)

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
