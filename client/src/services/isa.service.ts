import BaseService from './base.service'
import { formatEmail } from '../helpers/formattings'

const baseService = new BaseService()


export default class IsaService {

  public async getIsas() {
    return await baseService.getJSON('isas')
  }
}
