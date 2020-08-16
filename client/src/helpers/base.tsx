/* istanbul ignore file */

import * as _ from 'lodash'
import React, { ClassAttributes, DOMAttributes } from 'react'
import { Coach, User } from '../interfaces/baseIntefaces'

//eslint-disable-next-line
const emailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (email: string) => emailREGEX.test(String(email).toLowerCase())
export const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber && isNumber(phoneNumber) && phoneNumber.length > 8

export const notEmptyArray = (arr: any[] | null | undefined) => Array.isArray(arr) && arr.length > 0

export const fixClass = (className: any) => (className ? ' ' + className : '')

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

export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

// helper to get 1 lvl object difference
export const objDiff = (a: any, b: any) =>
  _.reduce(a, (result, value, key: any) => (_.isEqual(value, b[key]) ? result : result.concat(key)), [])

export const embedCalculator = (
  __percentage = 17,
  __months = 7,
  __max = 100,
  __current_income = 95,
  __future_income = 125,
) =>
  copyToClipboard(
    `
<script id="commit-muse-calc">
  const style = "input[type=range]{width:100%;background-color:#fff;-webkit-appearance:none;border:0;margin:0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{background:rgba(255,255,255,.6);border:1px solid #fff;width:100%;height:4px;cursor:pointer}input[type=range]::-webkit-slider-thumb{margin-top:-9px;width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer;-webkit-appearance:none}input[type=range]:focus::-webkit-slider-runnable-track{background:#fff}input[type=range]::-moz-range-track{background:rgba(255,255,255,.6);border:1px solid #fff;width:100%;height:4px;cursor:pointer}input[type=range]::-moz-range-thumb{width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer}input[type=range]::-ms-track{background:0 0;border-color:transparent;border-width:8px 0;color:transparent;width:100%;height:4px;cursor:pointer}input[type=range]::-ms-fill-lower{background:#fff;border:1px solid #fff}input[type=range]::-ms-fill-upper{background:rgba(255,255,255,.6);border:1px solid #fff}input[type=range]::-ms-thumb{width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer;margin-top:0}input[type=range]:focus::-ms-fill-lower{background:rgba(255,255,255,.6)}input[type=range]:focus::-ms-fill-upper{background:#fff}@supports (-ms-ime-align:auto){input[type=range]{margin:0}}#future_amount::-ms-thumb{background:#65d6ad!important}#future_amount::-moz-range-thumb{background:#65d6ad!important}#future_amount::-webkit-slider-thumb{background:#65d6ad!important}.ISACalculator-module{width:100%;max-width:512px;border-radius:10px;overflow:hidden;margin:0 auto}.ISACalculator-module header{background:#19216c;color:#fff;font-family:Heebo,sans-serif;font-style:normal;font-weight:500;font-size:16px;display:flex;justify-content:center;align-items:center;padding:12px 0}.ISACalculator-module header h2{font-weight:400}.ISACalculator-module .body .slider-wrapper{background:#4c63b6;padding:20px 16px}.ISACalculator-module .body .slider-wrapper .titles{display:grid;grid-template-columns:1fr 1fr}.ISACalculator-module .body .slider-wrapper .titles h2{font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:14px;text-transform:uppercase;color:#bed0f7}.ISACalculator-module .body .slider-wrapper .titles p{color:#fff;font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:16px}.ISACalculator-module .body .slider-wrapper .future-bill{display:flex;justify-content:space-between;margin-top:20px;padding-top:20px;border-top:1px solid #ffffff33}.ISACalculator-module .body .slider-wrapper .future-bill label{font-family:Heebo,sans-serif;font-style:normal;font-weight:500;font-size:14px;text-transform:uppercase;color:#bed0f7}.ISACalculator-module .body .slider-wrapper .future-bill p{color:#fff;font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:16px}.Slider-component{height:20px;display:flex;align-items:center;margin-top:20px}.empty-line{height:4px;width:100%;background:#ffffff4d;border-radius:3px;display:flex;justify-content:center}.line{width:100%}"
  const pe=document.getElementById("commit-muse-calc").parentElement;let _percentage=${__percentage},_months=${__months},_max=${__max},_current_income=${__current_income},_future_income=${__future_income},bill=_percentage/100*_future_income*(_months/12);const set_bill=(e,n)=>(bill=_percentage/100*n*(_months/12),n>_max&&(bill=_max),bill>e&&(bill=0),document.getElementById("bill").innerText=bill.toFixed(2).toString()),currentChange=e=>{const n=Number(e.target.value);_current_income=n,document.getElementById("current").innerText=e.target.value,set_bill(n,_future_income)},futureChange=e=>{const n=Number(e.target.value);_future_income=n,document.getElementById("future").innerText=e.target.value,set_bill(_current_income,n)},calc=\`\\n<section class="ISACalculator-module">\\n  <style>\\n  \${style}\\n  </style>\\n  <header>\\n  <h2>ISA Calculator</h2>\\n</header>\\n<div class="body">\\n  <div class="slider-wrapper">\\n  <div class="titles">\\n  <div>\\n  <h2>current income</h2>\\n<p><span id="current">\${_current_income}</span>K / YEAR</p>\\n  </div>\\n  <div>\\n  <h2>future income</h2>\\n<p><span id="future">\${_future_income}</span>K / YEAR</p>\\n  </div>\\n  </div>\\n\\n  <section class="Slider-component">\\n  <div class="empty-line">\\n  <input onchange="currentChange(event)" class="line" value="\${_current_income}" min="0" max="200" step="1" id="current_amount" type="range" />\\n  <input onchange="futureChange(event)" class="line" value="\${_future_income}" min="0" max="200" step="1" id="future_amount" type="range" />\\n  </div>\\n  </section>\\n\\n  <div class="future-bill">\\n  <label>Future Bill</label>\\n<p>$<span id="bill">\${bill}</span>K / YEAR (\${_percentage}%)</p>\\n  </div>\\n  </div>\\n  </div>\\n\\n  </section>\\n  \`;pe.insertAdjacentHTML("beforeend",calc);
</script>
`,
  )

export const createEl = <P extends DOMAttributes<T>, T extends Element>(
  el: string,
  child: any,
  props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> | null,
) => child && React.createElement(`${el}`, props, child)

export const makeName = (u: Coach | User) => (u ? u.first_name + ' ' + u.last_name : '')

// helper to check if value is number
export const intOrFloat = (value: string) =>
  /^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/.test(value) || value === '' || value[value.length - 1] === '.'

export const roundK = (val: number) => Math.round((val + Number.EPSILON) * 100) / 100
