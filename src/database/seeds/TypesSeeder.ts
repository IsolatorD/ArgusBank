import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { Types } from '../models/Types'

export default class TypesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Types)
      .values([
        {
          type: 'account',
          code: 'checking',
          description: 'Checking account type'
        },
        {
          type: 'account',
          code: 'saving',
          description: 'Saving account type'
        },
        {
          type: 'contact',
          code: 'email',
          description: 'Email contact type'
        },
        {
          type: 'contact',
          code: 'phone',
          description: 'Phone contact type'
        }
      ])
      .execute()

  }
}