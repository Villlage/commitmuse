import BaseService from './base.service'

const baseService = new BaseService()

export default class ClientService {
  public async getOffer(isa_id: number) {
    return await baseService.getJSON(`client/isas/${isa_id}`)
  }
}
