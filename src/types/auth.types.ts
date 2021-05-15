import { accountTypes } from "types";

export interface ILogin {
  username: string
  password: string
}

export interface IRegister {
  first_name: string
  last_name: string
  username: string
  password: string
  type: number,
  email: string
}

export interface IResetPassword {
  email: string
}