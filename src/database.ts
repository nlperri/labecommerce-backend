import { TProduct, TPurchase, TUser } from './types'

export const user: TUser[] = [
  {
    id: '1',
    email: 'lnataliaperri@gmail.com',
    password: 'natalia123',
  },
  {
    id: '2',
    email: 'danielluis@gmail.com',
    password: 'dnl123',
  },
]

export const product: TProduct[] = [
  {
    id: '1',
    name: 't-shirt',
    price: 40,
    category: 'clothing',
  },
  {
    id: '2',
    name: 'pants',
    price: 80,
    category: 'clothing',
  },
]

export const purchase: TPurchase[] = [
  {
    userId: user[0].id,
    productId: product[0].id,
    quantity: 1,
    totalPrice: product[0].price * 1,
  },
  {
    userId: user[1].id,
    productId: product[1].id,
    quantity: 3,
    totalPrice: product[1].price * 3,
  },
]
