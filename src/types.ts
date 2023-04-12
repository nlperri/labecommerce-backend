export enum CATEGORY {
  ACCESSORIES = 'Acessórios',
  CLOTHES_AND_SHOES = 'Roupas e calçados',
  ELECTRONICS = 'Eletrônicos',
}

export type TUser = {
  id: string
  email: string
  password: string
  name: string
}

export type TProduct = {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

export type TPurchase = {
  userId: string
  id: string
  paid: number
  deliveredAt?: string
  totalPrice?: number
}

export type TPurchasesProducts = {
  purchaseId: string
  productId: string
  quantity: number
}

export type TProductInput = {
  productId: string
  quantity: number
}
