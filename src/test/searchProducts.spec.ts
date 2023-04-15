import { createProductHandler, searchProductsHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('searchProducts', () => {
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
        return products
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

  it('should be able to get product by query name', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    const query = 'some-name'

    const returnedProducts = await searchProductsHandler(
      query,
      productRepository
    )

    const productExpectation = products

    expect(returnedProducts).toEqual(productExpectation)
  })

  it('should not search for product if doesnt send query', async () => {
    const query = ''

    const error = async () =>
      await searchProductsHandler(query, productRepository)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })

  it('should not search for product if id doesnt exist', async () => {
    const query = 'some-name'

    jest.spyOn(productRepository, 'searchProducts').mockResolvedValueOnce([])

    const error = async () =>
      await searchProductsHandler(query, productRepository)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 404,
        message: 'Produto não encontrado',
      })
    }
  })
})
