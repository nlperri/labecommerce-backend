import { CATEGORY, TProduct, TPurchase, TUser } from './types'

const users: TUser[] = []
const products: TProduct[] = []
const purchases: TPurchase[] = []

function createUser(id: string, email: string, password: string): void {
  const userVerification = users.find(
    (user) => user.email === email || user.id === id
  )

  if (userVerification) {
    console.log('Usuário já cadastrado')
  } else {
    const newUser = {
      id,
      email,
      password,
    }

    users.push(newUser)

    console.log('Cadastro realizado com sucesso')
  }
}

function getAllUsers(): void {
  console.log(users)
}

function createProduct(
  id: string,
  name: string,
  price: number,
  category: CATEGORY
): void {
  const newProduct = {
    id,
    name,
    price,
    category,
  }

  products.push(newProduct)

  console.log('Produto criado com sucesso')
}

function getAllProducts() {
  console.log(products)
}

function getProductById(idToSearch: string): void {
  const productId = products.find(
    (product) => product.id.toLowerCase() === idToSearch.toLowerCase()
  )

  if (productId) {
    console.log(productId)
  } else {
    console.log('Produto não encontrado')
  }
}

function queryProductsByName(q: string): void {
  const queryProducts = products.filter(
    (product) => product.name.toLowerCase() === q.toLowerCase()
  )

  if (queryProducts.length !== 0) {
    console.log(queryProducts)
  } else {
    console.log('Produto não encontrado')
  }
}

function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
): void {
  const newPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  }

  purchases.push(newPurchase)

  console.log('Compra realizada com sucesso')
}

function getAllPurchasesFromUserId(userIdToSearch: string): void {
  const userPurchasesIds = purchases
    .filter(
      (purchase) =>
        purchase.userId.toLowerCase() === userIdToSearch.toLowerCase()
    )
    .map((purchase) => purchase.productId)

  if (userPurchasesIds.length !== 0) {
    const userProducts = products.filter((product) =>
      userPurchasesIds.includes(product.id)
    )
    console.log(userProducts)
  } else {
    console.log('Produto não encontrado')
  }
}

console.log('---Create User---\n')
createUser('1', 'lnataliaperri@gmail.com', 'natalia123')
createUser('2', 'danielluis@gmail.com', 'dnl123')
createUser('3', 'lnataliaperri@gmail.com', 'nat123')
createUser('1', 'dndnd@gmail.com', 'awdas')

console.log('\n---Get All Users--- \n')
getAllUsers()

console.log('\n---Create Product--- \n')
createProduct('1', 't-shirt', 40, CATEGORY.CLOTHES_AND_SHOES)
createProduct('2', 'necklace', 80, CATEGORY.ACCESSORIES)

console.log('\n---Get All Products---\n')
getAllProducts()

console.log('\n---Get Product By Id--- \n')
getProductById('1')
getProductById('2')
getProductById('3')

console.log('\n---Query Products By Name---\n')
queryProductsByName('t-shirt')
queryProductsByName('necklace')
queryProductsByName('blabla')

console.log('\n---Create Purchase---\n')
createPurchase(users[0].id, products[0].id, 1, products[0].price)
createPurchase(users[1].id, products[1].id, 2, products[1].price * 2)

console.log('\n---All Purchases--- \n')
console.log(purchases)

console.log('\n---Get All Purchases From User Id \n')
getAllPurchasesFromUserId('1')
getAllPurchasesFromUserId('2')
getAllPurchasesFromUserId('3')
