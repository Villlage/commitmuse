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
}
