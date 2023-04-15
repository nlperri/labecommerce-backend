import { createProductHandler, getProductsHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { productRepositoryInMemory } from '../repositories/implementations/productRepositoryInMemory'
import { TProduct } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('getProducts', () => {
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
        return products
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
  afterEach(() => {
    products = []
  })

  it('should be able to list all products', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    const returnedProducts = await getProductsHandler(productRepository)

    const productExpectation = products

    expect(returnedProducts).toEqual(productExpectation)
  })
})
