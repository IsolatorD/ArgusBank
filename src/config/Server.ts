import * as express from 'express'
import * as cors from 'cors'
// Controllers
import { IndexController } from '../controllers/IndexController'
import { AuthController } from '../controllers/AuthController'

import { useExpressServer } from 'routing-controllers'

export class ExpressConfigServer {
  app: express.Express

  constructor () {
    this.app = express()
    this.app.use(cors())
    this.setupControllers()
  }

  setupControllers() {
    useExpressServer(this.app, {
      routePrefix: '/api',
      controllers: [
        IndexController,
        AuthController
      ]
    })
  }
}