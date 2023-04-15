import { createProductHandler, deleteProductByIdHandler } from '../handler'
import { productRepository } from '../repositories/contracts/productRepository'
import { TProduct, TPurchasesProducts } from '../types'
import { fieldsReturn } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('deleteProduct', () => {
  let productRepository: productRepository
  let fieldValidator: fieldValidator
  let products: TProduct[] = []
  const purchasesProducts: TPurchasesProducts[] = [
    {
      productId: 'some-id',
      purchaseId: 'some-purchase-id',
      quantity: 1,
    },
  ]

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
        const index = products.findIndex((product) => product.id === id)
        products.splice(index, 1)
      },

      async editProduct(product: TProduct) {
        throw new Error('Function not implemented.')
      },
      async deleteProductFromPurchasesProducts(id: string) {
        const index = purchasesProducts.findIndex(
          (purchaseProduct) => purchaseProduct.productId === id
        )
        purchasesProducts.splice(index, 1)
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
  it('should be able to delete product by its id', async () => {
    await createProductHandler(productMock, productRepository, fieldValidator)

    await deleteProductByIdHandler(productMock.id, productRepository)

    const productExpectation = products

    expect(productExpectation).toStrictEqual([])
  })

  it('should not be able to delete product if id doesnt exist', async () => {
    jest
      .spyOn(productRepository, 'getProductById')
      .mockResolvedValueOnce(undefined)

    const error = async () =>
      await deleteProductByIdHandler(productMock.id, productRepository)

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
