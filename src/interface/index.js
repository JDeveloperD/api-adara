/**
 * @fileoverview interface.js, aquí se encuentran los endpoints de toda la aplicación
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo
 */

import { Router } from 'express'
import config from 'config'
import routesUser from 'components/users/routes'

const { VERSION, INFO } = config.get('API')

function router (app) {
  const router = Router()

  router.get('/', (_req, res) => {
    res.json(INFO)
  })

  // register all endpoints
  router.use('/users', routesUser)

  app.use(`/api/v${VERSION}`, router)
}

export default router
