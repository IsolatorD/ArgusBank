import { createConnection, Connection, createConnections } from 'typeorm'
export class Database {
  db: Connection
  constructor () {}

  async setupDatabase () {
    this.db = await createConnection()
    return this.db
  }
}