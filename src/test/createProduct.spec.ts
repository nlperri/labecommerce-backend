import { createProductHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('createProduct', () => {
  let productRepository: productRepository
  let fieldValidator: fieldValidator
  let products: TProduct[] = []

  const productMock = {
    id: 'some-id',
    name: 'some-name',
    price: 1,
    description: 'some-description',
    imageUrl: 'some-url',
  }

  beforeEach(() => {
    productRepository = {
      async getProducts() {
        throw new Error('Function not implemented.')
      },

      async idExists(id: string) {
        return false
      },

      async create(product: TProduct) {
        products.push(product)
      },

      async getProductById(id: string) {
        throw new Error('Function not implemented.')
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
  })
  it('should be able to create a product', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    const productExpectation = products[0]

    expect(productExpectation).toHaveProperty('id')
    expect(productExpectation).toHaveProperty('name')
    expect(productExpectation).toHaveProperty('price')
    expect(productExpectation).toHaveProperty('description')
    expect(productExpectation).toHaveProperty('imageUrl')
    expect(productExpectation.id).toBe('some-id')
    expect(productExpectation.name).toBe('some-name')
    expect(productExpectation.price).toBe(1)
    expect(productExpectation.description).toBe('some-description')
    expect(productExpectation.imageUrl).toBe('some-url')
  })

  it('should not create a product without required params', async () => {
    const failedProductPayload = {} as TProduct

    const error = async () =>
      createProductHandler(
        failedProductPayload,
        productRepository,
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
  it('should not create a product if id is already registered', async () => {
    jest.spyOn(productRepository, 'idExists').mockResolvedValueOnce(true)

    const error = async () =>
      createProductHandler(productMock, productRepository, fieldValidator)

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
