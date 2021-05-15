import { Controller, Get, Post, Put, Delete, Body, Param } from 'routing-controllers'
import { Customer } from '../database/models/Customer'
import { CustomerContact } from '../database/models/CustomerContact'
import { Types } from '../database/models/Types'

import { ILogin, IRegister, IResetPassword } from '../types/auth.types'

import * as bcrypt from 'bcrypt'
import { JWT } from '../lib/JWT'

const jwt = new JWT({ expiresIn: '1m' })
@Controller('/auth')
export class AuthController {

  @Get('/')
  async index () {
    return 'Auth Controller'
  }

  @Post('/signup')
  async register(@Body() body: IRegister) {
    const {
      first_name,
      last_name,
      username,
      password,
      type,
      email
    } = body

    try {
      const customerContact = new CustomerContact()
      const emailType = await Types.findOne({
        where: { type: 'contact', code: 'email' }
      })

      customerContact.content = email
      customerContact.type = emailType.id

      const customer = new Customer()
      customer.first_name = first_name
      customer.last_name = last_name
      customer.username = username
      customer.password = password
      customer.type = type
      customer.contacts = [customerContact]

      await customerContact.save()
      await customer.save()

      return {
        success: true,
        statusCode: 200,
        message: 'Customer registrated!',
        customer,
        customerContact
      }
    } catch (error) {
      console.log(JSON.stringify(error))
      throw { error }
    }
  }

  @Post('/login')
  async login (@Body() body: ILogin) {
    const {
      username,
      password
    } = body
    try {
      const customer = await Customer.findOne({
        where: { username }
      })
      if (!customer) throw { error: 'customer_not_found', statusCode: 404 }

      const passwordMatch = bcrypt.compareSync(password, customer.password)
      if (!passwordMatch) throw { error: 'password_not_match', statusCode: 402 }

      const token = jwt.makeToken({ id: customer.id }, { subject: 'customer' })

      return {
        success: true,
        statusCode: 200,
        message: 'Login Successfully!',
        token
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      throw { error }
    }
  }

  @Post('/requestResetPassword')
  async resetPassword(@Body() body: IResetPassword) {
    const {
      email
    } = body

    try {
      const customerContact = await CustomerContact.findOne({
        where: { content: email },
        relations: ['customer']
      })

      if (!customerContact) throw { error: 'customer_not_found', statusCode: 404 }

      return {
        success: true,
        statusCode: 200,
        message: 'Password Reset Email Sent!',
        customerContact
      }
    } catch (error) {
      console.log(JSON.stringify(error))
      throw { error }
    }
  }
}