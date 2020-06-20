import { Dispatch } from 'redux'

const SET_AUTH_FIELD = 'SET_AUTH_FIELD'

export type AuthKeys =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone_number'
  | 'password'
  | 'company_name'
  | 'company_type'
  | 'title'
  | 'address'
  | 'company_website'
  | 'building_types'
  | 'project_types'
  | 'number_of_hourly_employees_range'

export interface AuthState {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  password: string
  company_name: string
  company_type: string
  title: string
  address: string
  company_website: string
  building_types: string
  project_types: string
  number_of_hourly_employees_range: string
}

const initialState: AuthState = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  company_name: '',
  company_type: '',
  title: '',
  address: '',
  company_website: '',
  building_types: '',
  project_types: '',
  number_of_hourly_employees_range: '0-5',
}

// actions
export const setAuthField = (e: string, key: AuthKeys) => ({
  type: SET_AUTH_FIELD,
  val: e,
  key,
})

export const authState = (state: any) => ({
  auth: state.auth,
})

export const authDispatcher = (dispatch: Dispatch) => ({
  setAuthField: (e: string, key: AuthKeys) => dispatch(setAuthField(e, key)),
})

export default function authReducer(state = initialState, action: { key: AuthKeys; val: string; type: string }) {
  if (action.type === SET_AUTH_FIELD) {
    return { ...state, [action.key]: action.val }
  }

  return state
}
