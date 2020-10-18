import BaseService from './base.service'
import { Company } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class CompanyService {
  public async create(company: Partial<Company>) {
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

  public async inviteCoach(
    company_id: number,
    coach: { first_name: string; last_name: string; email: string; user_role: 0 | 1 },
  ) {
    return await baseService.postJSON(`companies/${company_id}/invitation`, coach)
  }
}
