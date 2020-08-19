import BaseService from './base.service'
import { PlaidMetadata } from '../interfaces/baseIntefaces'

const baseService = new BaseService()

export default class PlaidService {

  public async getToken() {
    return await baseService.getJSON('plaid/link-token')
  }

  public async createItem(token: string, meta: PlaidMetadata) {
    const tokenRes = await this.getToken()
    return await baseService.postJSON('plaid/items', {
      public_token: tokenRes.link_token,
      metadata: {
        ...meta,
        public_token: tokenRes.link_token,
      }
    })
  }

  public async createCompanyItem(token: string, meta: PlaidMetadata, companyId: number | string) {
    const tokenRes = await this.getToken()
    return await baseService.postJSON('plaid/items', {
      public_token: tokenRes.link_token,
      metadata: {
        ...meta,
        public_token: tokenRes.link_token,
      },
    })
  }

  public async getMask(companyId: string | number) {
    return await baseService.getJSON(`plaid/items?company_id=${companyId}`)
  }
}
