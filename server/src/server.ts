import * as http from 'http'
import * as path from 'path'
import express from 'express'
import * as bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import * as routes from './routes'
import * as db from './utils/db_config'
import { BaseError } from './utils/customErrors'
import normalizePort from './utils/normalizePort'
import auth from './middleware/authentication'
import { getLogger } from './utils/logger'
// Imports the Google Cloud client library

const PORT_FALLBACK = '8080'

export class Server {
  public app: express.Application
  public port: string | number | boolean
  public httpServer: http.Server

  constructor() {
    this.app = express()
    db.initConnection()
    this.port = normalizePort(process.env.SERVER_PORT || PORT_FALLBACK)
    this.app.set('port', this.port)
    this.initMiddleware()
    this.initRoutes()
    this.initErrorHandling()
    this.httpServer = http.createServer(this.app)
  }

  /**
   * Fire up the bass cannon
   */
  public static bootstrap(): Server {
    return new Server()
  }

  /**
   * Stack middleware
   */
  private initMiddleware(): void {
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(auth.firebaseAuth())
    // this.app.use(auth.passport.initialize())
    // this.app.use(auth.authMiddleware())
  }

  /**
   * Add routers to exports in routes/index.ts and they'll be added here automatically
   */
  private initRoutes(): void {
    const router: express.Router = express.Router()
    Object.values(routes).forEach(route => {
      route.create(router)
    })
    this.app.use(router)
  }

  private initErrorHandling(): void {
    this.app.use((err, req, res, next) => {
      if (err == null) err = {}
      console.log('\x1b[31m', err)
      if (err instanceof BaseError) {
        res.status(err.status).json({ message: err.message, err })
      } else {
        getLogger().error(err) // only send log to google if is not an expected error
        res.status(err.status || err.statusCode || 500).json({ message: err.message || 'Internal Server Error', err })
      }
    })
  }
}
