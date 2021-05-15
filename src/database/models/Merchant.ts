import { IsDate, IsEmail, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, BeforeInsert, BeforeRemove, BeforeUpdate, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { statuses } from 'types'
import { Customer } from './Customer'
import { Product } from './Product'

@Entity('merchants')
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(1, 255)
  name: string

  @Column({ unique: true })
  @IsEmail()
  email: string
  
  @Column()
  phone: string

  @Column()
  status: statuses

  @OneToOne(type => Customer, customer => customer.merchant)
  @JoinColumn()
  customer: Customer

  @OneToMany(type => Product, products => products.merchant)
  products: Product[]

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