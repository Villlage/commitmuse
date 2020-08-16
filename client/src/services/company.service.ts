import BaseService from './base.service'
import { Company } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class CompanyService {

  public async create(company: Company) {
    return await baseService.postJSON('companies', company)
  }

  public async companyPricing(companyId: string) {
    return await baseService.getJSON(`company/${companyId}/pricing`)
  }

  public async createSubscription(company_id: string) {
    return await baseService.postJSON(`subscriptions`, {company_id})
  }
}