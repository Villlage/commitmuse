/* istanbul ignore file */

import * as _ from 'lodash'
import React from 'react'

//eslint-disable-next-line
const emailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (email: string) => emailREGEX.test(String(email).toLowerCase())
export const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber && isNumber(phoneNumber) && phoneNumber.length > 8

export const notEmptyArray = (arr: any[] | null | undefined) => Array.isArray(arr) && arr.length > 0

export const fixClass = (className: string | undefined | boolean) => (className ? ' ' + className : '')

export const noScroll = <style>{`html { overflow: hidden; }`}</style>

// helper to count array of objects by object's specific property
export const countArrayByProp = (arr: any[], prop: string, val: any) =>
  notEmptyArray(arr) ? arr.reduce((acc, cur) => (cur[prop] === val ? ++acc : acc), 0) : 0

// helper to count array of objects by object's specific property
export const countArrayByPropLength = (arr: any[], prop: string, val: number) =>
  notEmptyArray(arr) ? arr.reduce((acc, cur) => (cur[prop].length === val ? ++acc : acc), 0) : 0

// helper to count array of objects by object's specific property
export const countArrayByExistProp = (arr: any[], prop: string) =>
  notEmptyArray(arr) ? arr.reduce((acc, cur) => (!!cur[prop] ? ++acc : acc), 0) : 0

// helper to turn object to url query string params. ex: {a: 1, b:2} to ?a=1&b=2
export const objectToUrlParams = (obj: any) => {
  if (!obj) return ''
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '' || obj[key].length === 0) {
      delete obj[key]
    }
  })
  if (_.isEmpty(obj)) return ''
  return (
    '?' +
    Object.keys(obj)
      .map(key => key + '=' + obj[key])
      .join('&')
  )
}

// helper to capitalize string
export const capitalize = (str: string) =>
  str
    ? str
        .split(' ')
        .map(i => i.replace(/^\w/, c => c.toUpperCase()))
        .join(' ')
    : ''

// helper to check if MacOs is used by current user
export const isMac: boolean = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

// helper to use debounce from lodash
export const withDebounce = (func: any, delay: number) => _.debounce(func, delay)

// helper to check if value is number
export const isNumber = (value: number | string) => Number.isInteger(Number(value))

// helper to check if current device is mobile phone
export const is_mobile = window.innerWidth < 600

// helper to get query params from url
export const useQuery = (location: Location) => new URLSearchParams(location.search)

// recursive function to return as a string last property of the object
export const lastProperty = (obj: any): any => {
  if (typeof obj !== 'object') {
    return obj
  }
  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      return `${prop}: ${obj[prop][0]}`
    }
    return lastProperty(obj[prop])
  }
}

export const hidePhoneNumber = (num: string) => {
  if (!num) return ''
  const area_code_and_country_code = num.substr(0, Math.min(4, num.length))
  return area_code_and_country_code + ' XXX-XXXX'
}

export const hideEmail = (email: string) =>
  email
    ? email
        .split('@')[0]
        .split('')
        .map(() => 'x')
        .join('') +
      '@' +
      email.split('@')[1]
    : ''

// helper to get 1 lvl object difference
export const objDiff = (a: any, b: any) =>
  _.reduce(a, (result, value, key: any) => (_.isEqual(value, b[key]) ? result : result.concat(key)), [])
