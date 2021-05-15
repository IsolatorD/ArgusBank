import * as jwt from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'

const secretKey = process.env.APP_ID

export class JWT {
  options: object
  
  constructor(options = {}) {
    this.options = options    
  }
  
  public makeToken(payload, options) {
    const signOptions = {
      ...options,
      ...this.options,
      jwtid: uuidV4()
    }
    return jwt.sign(payload, secretKey, signOptions)
  }

  public decodeToken(token) {
    return jwt.decode(token)
  }

  public refreshToken(token) {
    const payload = jwt.verify(token, secretKey)
    const { iat, exp, nbf, jti, ...rest } = payload
    const signOptions = { ...this.options, jwtid: uuidV4() }

    return jwt.sign(payload, secretKey, signOptions)
  }
}