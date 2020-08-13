import BaseService from './base.service'
import { Company } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class CompanyService {

  public async create(company: Company) {
    return await baseService.postJSON('companies', company)
  }
}