import { IsDate, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert, BeforeRemove, BeforeUpdate, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { types } from 'types'

@Entity('code_types')
export class Types extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(1, 30)
  code: string

  @Column()
  description: string

  @Column()
  type: types

  @CreateDateColumn()
  @IsDate()
  created_at: Date

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date

  @DeleteDateColumn()
  @IsDate()
  deleted_at: Date
  
}