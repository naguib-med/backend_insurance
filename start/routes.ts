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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
