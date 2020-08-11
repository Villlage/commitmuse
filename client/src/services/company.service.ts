import BaseService from './base.service'

const baseService = new BaseService()

export default class CompanyService {

  public async create(isa_id: number) {
    return await baseService.getJSON(`/company`)
  }
}