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
}
