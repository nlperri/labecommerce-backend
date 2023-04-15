import { db } from '../../database/knex'
import { TPurchase } from '../../types'
import { purchaseRepository } from '../contracts/purchaseRepository'

export class purchaseRepositoryInMemory implements purchaseRepository {
  async getPurchases() {
    const result = await db('purchases')
    return result
  }
  async getUserPurchases(id: string) {
    const result = await db('purchases').where({ buyer_id: id })

    return result
  }
  async create(purchase: TPurchase) {
    const { userId, id, paid, totalPrice } = purchase

    await db
      .insert({
        id: id,
        buyer_id: userId,
        paid: paid,
        total_price: totalPrice,
      })
      .into('purchases')
  }
  async idExists(id: string) {
    const [result]: TPurchase[] = await db('purchases').where({ id: id })

    return !!result
  }
  async createPurchasesProducts(
    id: string,
    productId: string,
    quantity: number
  ) {
    const newPurchaseProduct = {
      product_id: productId,
      purchase_id: id,
      quantity,
    }

    await db('purchases_products').insert(newPurchaseProduct)
  }
  async deletePurchaseById(id: string) {
    await db.delete().from('purchases').where({ id: id })
  }
  async deletePurchaseFromPurchasesProducts(id: string) {
    await db.delete().from('purchases_products').where({ purchase_id: id })
  }

  async getPurchaseById(id: string) {
    const [result] = await db
      .from('purchases')
      .select(
        'purchases.id as purchaseId',
        'purchases.total_price as totalPrice',
        'purchases.created_at as createdAt',
        'purchases.paid as isPaid',
        'purchases.buyer_id as buyerId',
        'users.email',
        'users.name',
        db.raw(
          `(SELECT json_group_array(json_object(
          'id', products.id,
          'name', products.name,
          'price', products.price,
          'description', products.description,
          'imageUrl', products.image_url,
          'quantity', purchases_products.quantity
        ))) as productsList`
        )
      )
      .innerJoin('users', 'purchases.buyer_id', '=', 'users.id')
      .leftJoin(
        'purchases_products',
        'purchases.id',
        '=',
        'purchases_products.purchase_id'
      )
      .leftJoin('products', 'products.id', '=', 'purchases_products.product_id')
      .groupBy('purchases.id')
      .where({ 'purchases.id': id })

    const formattedResult = {
      purchaseId: result.purchaseId,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt,
      isPaid: !!result.isPaid,
      buyerId: result.buyerId,
      email: result.email,
      name: result.name,
      productsList: JSON.parse(result.productsList),
    }

    return formattedResult
  }
}
