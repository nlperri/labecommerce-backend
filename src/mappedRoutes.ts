import {
  getUserPurchasesController,
  createProductController,
  createPurchaseController,
  createUserController,
  deleteProductByIdController,
  deleteUserByIdController,
  editProductController,
  editUserController,
  getProductByIdController,
  searchProductsController,
  getProductsController,
  getPurchasesController,
  getUsersController,
  getPurchaseByIdController,
} from './controllers'

export const routesConfig = [
  {
    method: 'get',
    path: '/users',
    handler: new getUsersController().handle,
  },
  {
    method: 'get',
    path: '/products',
    handler: new getProductsController().handle,
  },
  {
    method: 'get',
    path: '/purchases',
    handler: new getPurchasesController().handle,
  },
  {
    method: 'get',
    path: '/products/search',
    handler: new searchProductsController().handle,
  },
  {
    method: 'post',
    path: '/users',
    handler: new createUserController().handle,
  },
  {
    method: 'post',
    path: '/products',
    handler: new createProductController().handle,
  },
  {
    method: 'post',
    path: '/purchases',
    handler: new createPurchaseController().handle,
  },
  {
    method: 'get',
    path: '/products/:id',
    handler: new getProductByIdController().handle,
  },
  {
    method: 'get',
    path: '/users/:id/purchases',
    handler: new getUserPurchasesController().handle,
  },
  {
    method: 'delete',
    path: '/users/:id',
    handler: new deleteUserByIdController().handle,
  },
  {
    method: 'delete',
    path: '/products/:id',
    handler: new deleteProductByIdController().handle,
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: new editUserController().handle,
  },
  {
    method: 'put',
    path: '/products/:id',
    handler: new editProductController().handle,
  },
  {
    method: 'get',
    path: '/purchases/:id',
    handler: new getPurchaseByIdController().handle,
  },
]
