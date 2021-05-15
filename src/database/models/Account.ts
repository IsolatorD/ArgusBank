import { IsDate, IsInt, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate, BeforeRemove, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { statuses } from 'types'
import { Customer } from './Customer'
import { Transaction } from './Transaction'

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsInt()
  @Length(20, 20)
  account_number: number

  @Column()
  @IsInt()
  type: number

  @Column()
  status: statuses

  @ManyToOne(type => Customer, customer => customer.accounts)
  customer: Customer

  @OneToMany(type => Transaction, transaction => transaction.account)
  transactions: Transaction[]

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
  }

  @BeforeRemove()
  removeEntry () {
    this.status = 'removed'
  }
}