/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

// // index
// router.get('/users', () => {
//   return "hai chiamato la rotta user"
// })

// // show
// router.get('/users/:id', ({ params }: HttpContext) => {
//   const id = params.id
//   return "hai chiamato la rotta user per lo user con id " + id
// })

// number nella rotta è opzionale
router.get('/users/:id/comments/:number?', ({ params }: HttpContext) => {
  const id = params.id
  const number = params.number
  return "hai chiamato la rotta user per lo user con id " + id + " per vedere il commento numero " + number
})

router.get('/settings/reset', () => {
  // logica per il reset delle impostazioni
  return "reset delle impostazioni"
})

// qualsiasi rotta che parta con settings/
router.get('/settings/*', ({ params }: HttpContext) => {
  const settings = params['*'] // array ['volume','level','75']
  return settings
})

router.group(() => {
  router.group(() => {
    router.post('signup', [controllers.NewAccount, 'store'])
    router.post('login', [controllers.AccessTokens, 'store'])
  }).prefix('auth')
    .as('auth')

  router.group(() => {
    router.get('profile', [controllers.Profile, 'show'])
    router.post('logout', [controllers.AccessTokens, 'destroy'])
  }).prefix('account')
    .as('profile')
    .use(middleware.auth())

  router.group(() => {
    router.get('/users', [controllers.Users, 'index'])
    router.get('/users/me', [controllers.Users, 'me'])
    router.get('/users/:id', [controllers.Users, 'show'])
    router.post('/users', [controllers.Users, 'store'])
    router.put('/users/:id', [controllers.Users, 'update'])
    router.delete('/users/:id', [controllers.Users, 'destroy'])

    // è equivalente a
    // router.resource('users', controllers.Users).apiOnly()
  }).use(middleware.auth())

}).prefix('/api/v1')
  .use(middleware.logger())
