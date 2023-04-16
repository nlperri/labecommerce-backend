import { createPurchaseHandler, getPurchasesHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TProduct, TPurchase, TPurchasesProducts, TUser } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('getPurchases', () => {
  let productRepository: productRepository
  let purchaseRepository: purchaseRepository
  let userRepository: userRepository
  let fieldValidator: fieldValidator
  let purchases: TPurchase[] = []
  let purchasesProducts: TPurchasesProducts[] = []

  const productInputMock = [
    {
      productId: 'product-id',
      quantity: 2,
    },
  ]

  const productMock = {
    id: 'product-id',
    name: 'product-name',
    price: 100,
    description: 'some-description',
    imageUrl: 'some-url',
  }

  const purchaseMock = {
    userId: 'user-id',
    id: 'purchase-id',
    paid: 0,
  }

  beforeEach(() => {
    purchaseRepository = {
      async getPurchases() {
        return purchases
      },
      async getUserPurchases() {
        throw new Error('Function not implemented.')
      },
      async create(purchase: TPurchase) {
        purchases.push(purchase)
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
        purchasesProducts.push({ productId, purchaseId: id, quantity })
      },
    }
    productRepository = {
      async getProducts() {
        throw new Error('Function not implemented.')
      },

      async idExists(id: string) {
        throw new Error('Function not implemented.')
      },

      async create(product: TProduct) {
        throw new Error('Function not implemented.')
      },

      async getProductById(id: string) {
        return productMock
      },

      async deleteProduct(id: string) {
        throw new Error('Function not implemented.')
      },

      async editProduct(product: TProduct) {
        throw new Error('Function not implemented.')
      },
      async deleteProductFromPurchasesProducts(id: string) {
        throw new Error('Function not implemented.')
      },
      async searchProducts(query: string) {
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
  afterEach(() => {
    purchases = []
    purchasesProducts = []
  })

  it('should be able to list all purchases', async () => {
    await createPurchaseHandler(
      purchaseMock,
      productInputMock,
      productRepository,
      purchaseRepository,
      userRepository,
      fieldValidator
    )

    const returnedPurchases = await getPurchasesHandler(purchaseRepository)

    const purchaseExpectation = purchases

    expect(returnedPurchases).toEqual(purchaseExpectation)
  })
})
