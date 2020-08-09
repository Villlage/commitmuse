import BaseService from './base.service'

const baseService = new BaseService()

export default class AdminService {

  public async getUsers() {
    return await baseService.getJSON(`admin/users`)
  }
  public async getIsas() {
    return await baseService.getJSON(`admin/isas`)
  }
}