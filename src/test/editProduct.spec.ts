import { createProductHandler, editProductHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('editProduct', () => {
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

  const editedProductMock = {
    id: productMock.id,
    name: 'some-new-name',
    price: 2,
    description: 'some-new-description',
    imageUrl: 'some-new-url',
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

      async editProduct(product: TProduct) {},
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
  it('should be able to edit a product by its id', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    await productRepository.getProductById(productMock.id)

    await editProductHandler(
      editedProductMock,
      productRepository,
      fieldValidator
    )

    const productExpectation = editedProductMock

    expect(productExpectation).toHaveProperty('id')
    expect(productExpectation).toHaveProperty('name')
    expect(productExpectation).toHaveProperty('price')
    expect(productExpectation).toHaveProperty('description')
    expect(productExpectation).toHaveProperty('imageUrl')
    expect(productExpectation.id).toBe(productMock.id)
    expect(productExpectation.name).toBe('some-new-name' || productMock.name)
    expect(productExpectation.price).toBe(2 || productMock.price)
    expect(productExpectation.description).toBe(
      'some-new-description' || productMock.description
    )
    expect(productExpectation.imageUrl).toBe(
      'some-new-url' || productMock.imageUrl
    )
  })
  it('should not edit a product if doesnt have any param', async () => {
    const emptyResponse = {} as TProduct

    const error = async () =>
      await editProductHandler(emptyResponse, productRepository, fieldValidator)

    try {
      await error()
    } catch (error) {
      expect(error).toMatchObject({
        statusCode: 400,
        message: 'Campos inválidos',
      })
    }
  })
  it('should not edit a product if id doesnt exist', async () => {
    jest
      .spyOn(productRepository, 'getProductById')
      .mockResolvedValueOnce(undefined)

    const error = async () =>
      await editProductHandler(productMock, productRepository, fieldValidator)

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
