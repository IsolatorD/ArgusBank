import { IsDate, IsInt } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeRemove, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { statuses } from 'types'
import { Customer } from './Customer'

@Entity('customer_contacts')
export class CustomerContact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column()
  @IsInt()
  type: number

  @Column()
  status: statuses

  @ManyToOne(type => Customer, customer => customer.contacts)
  customer: Customer

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