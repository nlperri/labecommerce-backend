import { router } from '.'
import { routesConfig } from './mappedRoutes'

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
