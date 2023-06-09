import { createPurchaseHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'
import { TPurchasesProducts } from '../types'
import { TProduct, TProductInput, TPurchase, TUser } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('createPurchase', () => {
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
        throw new Error('Function not implemented.')
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

  it('should be able to create a purchase', async () => {
    await createPurchaseHandler(
      purchaseMock,
      productInputMock,
      productRepository,
      purchaseRepository,
      userRepository,
      fieldValidator
    )

    const totalPrice = productInputMock[0].quantity * productMock.price

    const purchaseExpectation = purchases[0]

    expect(purchaseExpectation).toHaveProperty('userId')
    expect(purchaseExpectation).toHaveProperty('id')
    expect(purchaseExpectation).toHaveProperty('paid')
    expect(purchaseExpectation).toHaveProperty('totalPrice')
    expect(purchaseExpectation.userId).toBe('user-id')
    expect(purchaseExpectation.id).toBe('purchase-id')
    expect(purchaseExpectation.paid).toBe(0)
    expect(purchaseExpectation.totalPrice).toBe(totalPrice)
  })

  it('should not create a purchase without required params', async () => {
    const failedPurchasePayload = {} as TPurchase

    const error = async () =>
      await createPurchaseHandler(
        failedPurchasePayload,
        productInputMock,
        productRepository,
        purchaseRepository,
        userRepository,
        fieldValidator
      )

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })

  it('should not create a purchase if product details are not valid', async () => {
    const failedProductInputPayload = [] as TProductInput[]

    const error = async () =>
      await createPurchaseHandler(
        purchaseMock,
        failedProductInputPayload,
        productRepository,
        purchaseRepository,
        userRepository,
        fieldValidator
      )

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })

  it('should not create a purchase if user id doesnt exist', async () => {
    jest.spyOn(userRepository, 'idExists').mockResolvedValueOnce(false)

    const error = async () =>
      await createPurchaseHandler(
        purchaseMock,
        productInputMock,
        productRepository,
        purchaseRepository,
        userRepository,
        fieldValidator
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

  it('should not create a purchase if id already registered', async () => {
    jest.spyOn(purchaseRepository, 'idExists').mockResolvedValueOnce(true)

    const error = async () =>
      await createPurchaseHandler(
        purchaseMock,
        productInputMock,
        productRepository,
        purchaseRepository,
        userRepository,
        fieldValidator
      )

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 409,
        message: 'Id de compra já cadastrado',
      })
    }
  })

  it('should not create a purchase if product id doesnt exist', async () => {
    jest

    jest
      .spyOn(productRepository, 'getProductById')
      .mockResolvedValueOnce(undefined)

    const error = async () =>
      await createPurchaseHandler(
        purchaseMock,
        productInputMock,
        productRepository,
        purchaseRepository,
        userRepository,
        fieldValidator
      )
    console.log('aqui')
    try {
      await error()
    } catch (error) {
      console.log(error)
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Produto não encontrado',
      })
    }
  })
})
