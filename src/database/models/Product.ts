import { IsDate, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, BeforeInsert, BeforeRemove, BeforeUpdate, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { statuses } from 'types'
import { Merchant } from './Merchant'

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(1, 255)
  name: string

  @Column()
  description: string

  @Column()
  status: statuses

  @ManyToOne(type => Merchant, merchant => merchant.products)
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
  }

  @BeforeRemove()
  removeCustomer () {
    this.status = 'removed'
  }

}