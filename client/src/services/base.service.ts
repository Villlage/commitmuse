import currentEnv from '../config/environment'
import { objectToUrlParams } from '../helpers/base'
import { log } from './logging.service'

type PostAPIs = 'register' | 'login' | 'user' | 'isas' | 'plaid/items'

type PatchAPIs = 'register' | 'login' | 'user'

type GetAPIs = 'logout' | 'user' | 'check-auth' | string

export default class BaseService {
  public MAIN_API = currentEnv().MAIN_API

  private handleError = (res: { error: { any: string[] } | string }) => {
    if (typeof res.error === 'string') return res
    const values = Object.values(res.error)
    const keys = Object.keys(res.error)
    const err = {
      error: keys
        .map((key, i) => {
          const message = Array.isArray(values[i]) ? values[i].join(', ') : Object.values(values[i]).join(', ')
          return key + ': ' + message
        })
        .join('\n'),
    }
    log('Error in handleError method in BaseService', err)
    return err
  }

  // check if type of response is JSON
  private handleResponseType = async (res: Response) => {
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return await res.json()
    } else {
      log('Received type is not JSON but *: ', await res.text())
      return null
    }
  }

  // define request headers
  private headers = () => {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
    }
  }

  getJSON = async (url: GetAPIs, params?: object) => {
    const res = await fetch(this.MAIN_API + url + `${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: this.headers(),
      credentials: 'include',
    })
    const response = await this.handleResponseType(res)
    if (response && response.error) {
      return this.handleError(response)
    }
    return response
  }

  postJSON = async (url: PostAPIs, data: any, saveCookie?: boolean) => {
    try {
      const res = await fetch(this.MAIN_API + url, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(data),
        credentials: 'include',
      })

      if (saveCookie) {
        log(res)
      }

      const response = await this.handleResponseType(res)
      if (response && response.error) {
        return this.handleError(response)
      }
      return response
    } catch (e) {
      log('Error doing postJSON in base.service.ts: ', e)
      throw e
    }
  }

  patchJSON = async (url: PatchAPIs, data: any) => {
    try {
      const res = await fetch(this.MAIN_API + url, {
        method: 'PATCH',
        headers: this.headers(),
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const response = await this.handleResponseType(res)
      if (response && response.error && typeof response.error === 'object') {
        return this.handleError(response)
      }
      return response
    } catch (e) {
      log('Error doing patchJSON in base.service.ts: ', e)
      throw e
    }
  }

  deleteJSON = async (url: string, data: any) => {
    try {
      const res = await fetch(this.MAIN_API + url, {
        method: 'DELETE',
        headers: this.headers(),
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const response = await this.handleResponseType(res)
      if (response && response.error && typeof response.error === 'object') {
        return this.handleError(response)
      }
      return response
    } catch (e) {
      log('Error doing patchJSON in base.service.ts: ', e)
      throw e
    }
  }

  postFormData = async (url: string, data: FormData, method?: 'post' | 'patch') => {
    try {
      const res = await fetch(this.MAIN_API + url, {
        method: method || 'post',
        credentials: 'include',
        body: data,
      })
      const response = await this.handleResponseType(res)
      if (response && response.error) {
        return this.handleError(response)
      }
      return response
    } catch (e) {
      log('Error doing postFormData in base.service.ts: ', e)
      throw e
    }
  }
}
