import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'
import { ISA } from '../interfaces/baseIntefaces'

const baseService = new BaseService()


export default class IsaService {

  public async getIsas() {
    return await baseService.getJSON('isas')
  }

  public async create(isa: ISA) {
    return await baseService.postJSON('isas', isa)
  }
}
