export enum CATEGORY {
  ACCESSORIES = 'Acessórios',
  CLOTHES_AND_SHOES = 'Roupas e calçados',
  ELECTRONICS = 'Eletrônicos',
}

export type TUser = {
  id: string
  email: string
  password: string
}

export type TProduct = {
  id: string
  name: string
  price: number
  category: CATEGORY
}

export type TPurchase = {
  userId: string
  id: string
  paid: number
  deliveredAt?: string
  totalPrice: number
}
