import { ExpressConfigServer } from './Server'
import { Database } from './Database'

const port = process.env.APP_PORT || 3000

export class Application {
  server: any
  database: any
  express: ExpressConfigServer

  constructor () {
    this.database = new Database().setupDatabase().then(conn => {
      console.log(`Database connection initialized with driver ${process.env.TYPEORM_CONNECTION} to ${conn.driver.database}`);
      this.express = new ExpressConfigServer()
      this.server = this.express.app.listen(port, () => {
        console.log(`Server running in port ${port}`)
      })
    })
  }
}