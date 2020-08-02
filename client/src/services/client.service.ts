import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'
import { ISA } from '../interfaces/baseIntefaces'

const baseService = new BaseService()


export default class ClientService {

  public async getOffer(isa_id: number) {
    return await baseService.getJSON(`client/isas/${isa_id}`)
  }

  public async resetPassword(user_id: number, password: string) {
    return await baseService.patchJSON(`users/reset-password`, {
      token: user_id,
      password: password
    })
  }
}