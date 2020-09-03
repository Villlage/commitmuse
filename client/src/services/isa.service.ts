import BaseService from './base.service'
import { IsaClient } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class IsaService {
  public async getIsas() {
    return await baseService.getJSON('isas')
  }

  public async create(isa: {
    current_income: number
    percentage: number
    cap: number
    time_to_be_paid: number
    description: string
    industry_field: string
    program_duration_weeks: string
    cancellation_period_weeks: number
    coach_id: number
    client: IsaClient
    status: string
  }) {
    return await baseService.postJSON('isas', isa)
  }

  public async getIsaById(isa_id: number) {
    return await baseService.getJSON(`isas/${isa_id}`)
  }

  public async signIsa(isa_id: number) {
    return await baseService.getJSON(`isas/${isa_id}/sign`)
  }

  public async docusignLogin() {
    return await baseService.getJSON(`ds/login`)
  }
}
