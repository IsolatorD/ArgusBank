import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
// Controllers
import { IndexController } from '../controllers/IndexController'
import { AuthController } from '../controllers/AuthController'

import { useExpressServer } from 'routing-controllers'

export class ExpressConfigServer {
  app: express.Express

  constructor () {
    this.app = express()
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
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