import { Controller, Get, Post, Put, Delete } from 'routing-controllers'


@Controller('/auth')
export class AuthController {

  @Get('/')
  async index () {
    return {
      user: 'soy el user'
    }
  }

  @Post()
  async save () {}
  
  @Put()
  async update () {}

  @Delete()
  async delete () {}
}