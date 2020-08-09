import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'
import { ISA } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class AdminService {

  public async getUsers() {
    return await baseService.getJSON(`admin/users`)
  }
  public async getIsas() {
    return await baseService.getJSON(`admin/isas`)
  }
}