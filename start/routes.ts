/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/register', 'AuthController.register')
    router.post('/login', 'AuthController.login')
    router.post('/logout', 'AuthController.logout').use(middleware.auth())
  })
  .prefix('/auth')

router.get('/me', 'AuthController.me').use(middleware.auth())

router
  .group(() => {
    router.get('/', 'ContractController.index')
    router.post('/', 'ContractController.store')
    router.get('/:id', 'ContractController.show')
    router.put('/:id', 'ContractController.update')
    router.delete('/:id', 'ContractController.destroy')
  })
  .prefix('/contracts')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', 'SubscriptionController.index')
    router.post('/', 'SubscriptionController.store')
    router.delete('/:id', 'SubscriptionController.destroy')
  })
  .prefix('/subscriptions')
  .use(middleware.auth())

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
