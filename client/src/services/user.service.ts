import BaseService from './base.service'

const baseService = new BaseService()

export default class UserService {
  public async getCurrentUser() {
    return await baseService.getJSON('user')
  }

  public async checkAuth() {
    return await baseService.getJSON('check-auth')
  }

  public async editUser(details: any) {
    return await baseService.patchJSON('user', details)
  }

  public async getIndustryFields() {
    return await baseService.getJSON('industry-fields')
  }

  public async resetPassword(user_id: number, password: string, token?: string) {
    return await baseService.patchJSON(`users/reset-password`, {
      token: token || user_id,
      password: password,
    })
  }

  public async getCoach(coach_id: number) {
    return await baseService.getJSON(`coach/${coach_id}`)
  }
}
