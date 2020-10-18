import BaseService from './base.service'

const baseService = new BaseService()

export default class AdminService {

  public async getUsers() {
    return await baseService.getJSON(`admin/users`)
  }

  public async getIsas() {
    return await baseService.getJSON(`admin/isas`)
  }

  public async getCompanies() {
    return await baseService.getJSON(`admin/companies`)
  }

  async editUser(userId: number, partial: any) {
    return await baseService.patchJSON(`admin/users/${userId}`, partial)
  }
}
