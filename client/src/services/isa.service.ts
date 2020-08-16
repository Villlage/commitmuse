import BaseService from './base.service'

const baseService = new BaseService()

export default class IsaService {
  public async getIsas() {
    return await baseService.getJSON('isas')
  }

  public async create(isa: any) {
    return await baseService.postJSON('isas', isa)
  }

  public async getIsaById(isa_id: number) {
    return await baseService.getJSON(`isas/${isa_id}`)
  }
}
