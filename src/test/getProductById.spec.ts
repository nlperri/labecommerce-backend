import { createProductHandler, getProductByIdHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('getProductById', () => {
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
  })
  afterEach(() => {
    products = []
  })
  it('should be able to get a specific product by its id', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    const returnedProduct = await getProductByIdHandler(
      productMock.id,
      productRepository
    )

    const productExpectation = products[0]

    expect(returnedProduct).toEqual(productExpectation)
  })
  it('should not be able to get a product if id doesnt exist', async () => {
    jest
      .spyOn(productRepository, 'getProductById')
      .mockResolvedValueOnce(undefined)

    const error = async () =>
      await getProductByIdHandler(productMock.id, productRepository)

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
