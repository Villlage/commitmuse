import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'

const baseService = new BaseService()

interface User {
  email: string
  first_name: string
  last_name: string
  password: string
  phone_number: string
  is_demand?: boolean
}

export default class AuthService {
  public async register(user: User) {
    try {
      const res = await baseService.postJSON('register', user)

      if (res && !res.error) {
        await this.login({ email: formatEmail(user.email), password: user.password })
      }

      return res
    } catch (e) {
      throw e
    }
  }

  public async login(user: { password: string; email: string }) {
    return await baseService.postJSON('login', { email: formatEmail(user.email), password: user.password })
  }

  public async signOut() {
    return await baseService.getJSON('logout')
  }
}
