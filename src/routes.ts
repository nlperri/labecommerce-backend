import { Request, Response } from 'express'
import { router } from '.'
import { products, purchases, users } from './database'
import AppError from './error'
import { createProduct } from './handler/createProductHandler'
import { createPurchaseHandler } from './handler/createPurchaseHandler'
import { createUserHandler } from './handler/createUserHandler'
import { deleteProductByIdHandler } from './handler/deleteProductByIdHandler'
import { deleteUserByIdHandler } from './handler/deleteUserByIdHandler'
import { editProductHandler } from './handler/editProductHandler'
import { editUserHandler } from './handler/editUserHandler'
import { getProductsByIdHandler } from './handler/getProductByIdHandler'
import { getUserPurchasesHandler } from './handler/getUserPurchasesHandler'
import { searchProductsHandler } from './handler/searchProductsHandler'
import { TProduct, TPurchase, TUser } from './types'

export function routerFactory() {
  routesConfig.forEach((route) => {
    const { method, path, handler } = route

    switch (method) {
      case 'get':
        return router.get(path, handler)
      case 'post':
        return router.post(path, handler)
      case 'put':
        return router.put(path, handler)
      case 'delete':
        return router.delete(path, handler)
    }
  })
}

const routesConfig = [
  {
    method: 'get',
    path: '/users',
    handler: (_: Request, res: Response) => {
      res.status(200).send(users)
    },
  },
  {
    method: 'get',
    path: '/products',
    handler: (_: Request, res: Response) => {
      res.status(200).send(products)
    },
  },
  {
    method: 'get',
    path: '/purchases',
    handler: (_: Request, res: Response) => {
      res.status(200).send(purchases)
    },
  },
  {
    method: 'get',
    path: '/products/search',
    handler: (req: Request, res: Response) => {
      const query = req.query.q as string
      const result = searchProductsHandler(query)

      res.status(200).send(result)
    },
  },
  {
    method: 'post',
    path: '/users',
    handler: (req: Request, res: Response) => {
      const { id, email, password } = req.body as TUser

      createUserHandler({ id, email, password })

      res.status(201).send('Usuário cadastrado com sucesso')
    },
  },
  {
    method: 'post',
    path: '/products',
    handler: (req: Request, res: Response) => {
      const { category, id, name, price } = req.body as TProduct

      createProduct({ category, id, name, price })

      res.status(201).send('Produto cadastrado com sucesso')
    },
  },
  {
    method: 'post',
    path: '/purchases',
    handler: (req: Request, res: Response) => {
      const { userId, productId, quantity, totalPrice } = req.body

      createPurchaseHandler({ userId, productId, quantity, totalPrice })

      res.status(201).send('Compra realizada com sucesso')
    },
  },
  {
    method: 'get',
    path: '/products/:id',
    handler: (req: Request, res: Response) => {
      const id = req.params.id

      const productToFind = getProductsByIdHandler(id)

      res.status(200).send(productToFind)
    },
  },
  {
    method: 'get',
    path: '/users/:id/purchases',
    handler: (req: Request, res: Response) => {
      const id = req.params.id

      const userPurchases = getUserPurchasesHandler(id)

      res.status(200).send(userPurchases)
    },
  },
  {
    method: 'delete',
    path: '/users/:id',
    handler: (req: Request, res: Response) => {
      const id = req.params.id

      deleteUserByIdHandler(id)

      res.status(200).send('Usuário deletado com sucesso')
    },
  },
  {
    method: 'delete',
    path: '/products/:id',
    handler: (req: Request, res: Response) => {
      const id = req.params.id

      deleteProductByIdHandler(id)

      res.status(200).send('Produto deletado com sucesso')
    },
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: (req: Request, res: Response) => {
      const id = req.params.id
      const { email, password } = req.body as TUser

      editUserHandler({ email, password, id })

      return res.status(200).send('Cadastro atualizado com sucesso')
    },
  },
  {
    method: 'put',
    path: '/products/:id',
    handler: (req: Request, res: Response) => {
      const id = req.params.id
      const { name, price, category } = req.body as TProduct

      editProductHandler({ id, name, price, category })

      res.status(200).send('Produto atualizado com sucesso')
    },
  },
]
