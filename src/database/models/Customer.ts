import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, BeforeUpdate, BeforeInsert, BeforeRemove, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsInt, Length } from 'class-validator'

import { Account } from './Account'
import { CustomerContact } from './CustomerContact'
import { Merchant } from './Merchant'
import { statuses } from 'types'

import * as bcrypt from 'bcrypt'
@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(1, 50)
  first_name: string
  
  @Column()
  @Length(1, 50)
  last_name: string
  
  @Column({ unique: true })
  @Length(1, 30)
  username: string

  @Column()
  password: string
  
  @Column()
  @IsInt()
  type: number

  @Column()
  status: statuses

  @OneToMany(type => Account, account => account.customer)
  accounts: Account[]

  @OneToMany(type => CustomerContact, customerContact => customerContact.customer)
  contacts: CustomerContact[]

  @OneToOne(type => Merchant, merchant => merchant.customer)
  merchant: Merchant

  @CreateDateColumn()
  @IsDate()
  created_at: Date

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date

  @DeleteDateColumn()
  @IsDate()
  deleted_at: Date

  @BeforeInsert()
  initDates() {
    this.status = 'pending'
    this.password = bcrypt.hashSync(this.password, 10)
  }

  @BeforeRemove()
  removeEntry () {
    this.status = 'removed'
  }
}