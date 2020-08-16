import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'

const baseService = new BaseService()

interface User {
  email: string
  password: string
}

export default class AuthService {
  public async register(user: User) {
    return await baseService.postJSON('register', user)
  }

  public async login(user: { password: string; email: string }) {
    return await baseService.postJSON('login', { email: formatEmail(user.email), password: user.password })
  }

  public async signOut() {
    return await baseService.getJSON('logout')
  }
}
