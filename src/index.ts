import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, purchases, users } from './database'
import { TProduct, TPurchase, TUser } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003')
})

app.get('/users', (req: Request, res: Response) => {
  res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
  res.status(200).send(products)
})

app.get('/purchases', (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

app.get('/products/search', (req: Request, res: Response) => {
  const query = req.query.q as string
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  if (result.length === 0) {
    return res.status(404).send('Produto não encontrado')
  }

  res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
  const body = req.body
  const { id, email, password } = body

  if (!id || !email || !password) {
    return res.status(400).send('Error')
  }

  const idAlreadyExists = users.find((user) => user.id === id)

  if (idAlreadyExists) {
    return res.status(409).send('Id já cadastrado')
  }

  const emailAlreadyExists = users.find((user) => user.email === email)

  if (emailAlreadyExists) {
    return res.status(409).send('E-mail já cadastrado')
  }

  const newUser: TUser = {
    id,
    email,
    password,
  }

  users.push(newUser)

  res.status(201).send('Usuário cadastrado com sucesso')
})

app.post('/products', (req: Request, res: Response) => {
  const body = req.body
  const { id, name, price, category } = body

  if (!id || !name || !price || !category) {
    return res.status(400).send('Error')
  }

  const idAlreadyExists = products.find((product) => product.id === id)

  if (idAlreadyExists) {
    return res.status(409).send('Id já cadastrado')
  }

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  }

  products.push(newProduct)

  res.status(201).send('Produto cadastrado com sucesso')
})

app.post('/purchases', (req: Request, res: Response) => {
  const body = req.body
  const { userId, productId, quantity, totalPrice } = body

  if (!userId || !productId || !quantity || !totalPrice) {
    return res.status(400).send('Error')
  }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  }

  purchases.push(newPurchase)

  res.status(201).send('Compra realizada com sucesso')
})
