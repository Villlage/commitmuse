import BaseService from './base.service'
import { Company } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class CompanyService {
  public async create(company: Company) {
    return await baseService.postJSON('companies', company)
  }

  public async companyPricing(companyId: string) {
    return await baseService.getJSON(`companies/${companyId}/pricing`)
  }

  public async overview(companyId: number) {
    return await baseService.getJSON(`companies/${companyId}/overview`)
  }

  public async createSubscription(company_id: string | number) {
    return await baseService.postJSON(`subscriptions`, { company_id })
  }

  public async coaches(company_id: number) {
    return await baseService.getJSON(`companies/${company_id}/coaches`)
  }

  public async isas(company_id: number) {
    return await baseService.getJSON(`companies/${company_id}/isas`)
  }
}
