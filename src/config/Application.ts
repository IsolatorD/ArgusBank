import { ExpressConfigServer } from './Server'
import { Database } from './Database'
import { JWT } from '../lib/JWT'

const port = process.env.APP_PORT || 3000

export class Application {
  server: any
  database: any
  express: ExpressConfigServer
  jwt: JWT

  constructor () {
    this.jwt = new JWT({ expiresIn: '1m' })

    this.database = new Database().setupDatabase().then(conn => {
      console.log(`Database connection initialized with driver ${process.env.TYPEORM_CONNECTION} to ${conn.driver.database}`);
      this.express = new ExpressConfigServer()
      this.server = this.express.app.listen(port, () => {
        console.log(`Server running in port ${port}`)

        const token = this.jwt.makeToken({ name: 'daniel' }, { subject: 'user' })
        const decodedToken = JSON.stringify(this.jwt.decodeToken(token))
        let oldToken = null
        setTimeout(() => {
          oldToken = JSON.stringify(this.jwt.decodeToken(token))
          console.log('-------------------');
          console.log(`Token vencido, ${oldToken}`);
        }, 61000);
        
        console.log(`Token generado, ${token}`)
        console.log('-------------------');
        console.log(`Token decodificado, ${decodedToken}`)
      })
    })
  }
}