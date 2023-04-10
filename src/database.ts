import { CATEGORY, TProduct, TPurchase, TUser } from './types'

export const users: TUser[] = [
  {
    id: 'u001',
    email: 'natalia@gmail.com',
    password: 'natalia123',
  },
  {
    id: 'u002',
    email: 'daniel@gmail.com',
    password: 'daniel123',
  },
]

export const products: TProduct[] = [
  {
    id: 'p001',
    name: 't-shirt',
    price: 49.9,
    category: CATEGORY.CLOTHES_AND_SHOES,
  },
  {
    id: 'p002',
    name: 'necklace',
    price: 89.9,
    category: CATEGORY.ACCESSORIES,
  },
]
export const purchases: TPurchase[] = [
  {
    userId: users[0].id,
    id: 'p001',
    paid: 1,
    deliveredAt: '123',
    totalPrice: products[0].price * 1,
  },
  {
    userId: users[1].id,
    id: 'p002',
    paid: 0,
    deliveredAt: '123',
    totalPrice: products[1].price * 2,
  },
]
