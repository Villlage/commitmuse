import BaseService from './base.service'
import { PlaidMetadata } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class PlaidService {
  public async createItem(token: string, meta: PlaidMetadata) {
    return await baseService.postJSON('plaid/items', {
      public_token: token,
      metadata: meta,
    })
  }

  public async createCompanyItem(token: string, meta: PlaidMetadata, companyId: number | string) {
    return await baseService.postJSON(`plaid/items?company_id=${companyId}`, {
      public_token: token,
      metadata: meta,
    })
  }

  public async getMask(companyId: string | number) {
    return await baseService.getJSON(`plaid/items?company_id=${companyId}`)
  }
}
