import { IsDate, IsInt } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, BeforeInsert, BeforeRemove, BeforeUpdate, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { transactionStatuses } from 'types'
import { Account } from './Account'

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  amount: number

  @Column()
  @IsInt()
  type: number

  @Column()
  status: transactionStatuses

  @ManyToOne(type => Account, account => account.transactions)
  account: Account

  @CreateDateColumn()
  @IsDate()
  created_at: Date

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date

  @DeleteDateColumn()
  @IsDate()
  deleted_at: Date

  @BeforeRemove()
  removeEntry () {
    this.status = 'removed'
  }
}