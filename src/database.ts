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
    productId: products[0].id,
    quantity: 1,
    totalPrice: products[0].price * 1,
  },
  {
    userId: users[1].id,
    productId: products[1].id,
    quantity: 2,
    totalPrice: products[1].price * 2,
  },
]

// function createUser(id: string, email: string, password: string): void {
//   const userVerification = users.find(
//     (user) => user.email === email || user.id === id
//   )

//   if (userVerification) {
//     console.log('Usuário já cadastrado')
//   } else {
//     const newUser = {
//       id,
//       email,
//       password,
//     }

//     users.push(newUser)

//     console.log('Cadastro realizado com sucesso')
//   }
// }

// function getAllUsers(): void {
//   console.log(users)
// }

// function createProduct(
//   id: string,
//   name: string,
//   price: number,
//   category: CATEGORY
// ): void {
//   const newProduct = {
//     id,
//     name,
//     price,
//     category,
//   }

//   products.push(newProduct)

//   console.log('Produto criado com sucesso')
// }

// function getAllProducts() {
//   console.log(products)
// }

// function getProductById(idToSearch: string): void {
//   const productId = products.find(
//     (product) => product.id.toLowerCase() === idToSearch.toLowerCase()
//   )

//   if (productId) {
//     console.log(productId)
//   } else {
//     console.log('Produto não encontrado')
//   }
// }

// function queryProductsByName(q: string): void {
//   const queryProducts = products.filter(
//     (product) => product.name.toLowerCase() === q.toLowerCase()
//   )

//   if (queryProducts.length !== 0) {
//     console.log(queryProducts)
//   } else {
//     console.log('Produto não encontrado')
//   }
// }

// function createPurchase(
//   userId: string,
//   productId: string,
//   quantity: number,
//   totalPrice: number
// ): void {
//   const newPurchase = {
//     userId,
//     productId,
//     quantity,
//     totalPrice,
//   }

//   purchases.push(newPurchase)

//   console.log('Compra realizada com sucesso')
// }

// function getAllPurchasesFromUserId(userIdToSearch: string): void {
//   const userPurchasesIds = purchases
//     .filter(
//       (purchase) =>
//         purchase.userId.toLowerCase() === userIdToSearch.toLowerCase()
//     )
//     .map((purchase) => purchase.productId)

//   if (userPurchasesIds.length !== 0) {
//     const userProducts = products.filter((product) =>
//       userPurchasesIds.includes(product.id)
//     )
//     console.log(userProducts)
//   } else {
//     console.log('Produto não encontrado')
//   }
// }
