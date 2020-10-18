import * as H from 'history'

export interface Dict {
  [key: string]: any
}

export interface ScreenProps {
  plaid_token: string
  currentUser: User
  history: H.History
  fetchUser(): void
  setCurrentUser(u: User | null): void
  location: Location
}

export type UserTypes = 'student' | 'coach' | 'company_admin' | 'admin'

export interface User {
  id: number
  first_name: string
  last_name: string
  phone_number: string
  user_role: number
  confirmed_at: null | string
  email: string
  hourly_rate: number
  company: number
  is_active: boolean
  profile_picture: string
  profile_picture_link: string
  created_at: string
  updated_at: string
  coaches: number[]
  plaid_account: []
  plaid_items: []
  students: []
  user_type: UserTypes
}

export interface Coach {
  id: number
  company: number
  email: string
  first_name: string
  is_active: boolean
  last_name: string
  plaid_account: number[]
  plaid_items: number[]
  type: string
  user_role: number
  user_type: string
}

export interface ISA {
  id: number
  current_income: number
  percentage: number
  cap: number
  time_to_be_paid: number
  program_duration_weeks: number
  expiration_period_months: null | number
  status: string
  description: string
  coach_id: number
  client: any
  coach: User
  student: User
  cancellation_period_weeks: number
  created_at: string
  industry_field: null | string
  updated_at: null | string
}

export interface PlaidAccount {
  id: string
  name: string
  type: string
  subtype: string
  mask: string
}

export interface PlaidMetadata {
  account: PlaidAccount
  account_id: null | number
  accounts: PlaidAccount[]
  institution: {
    name: string
    institution_id: string
  }
  link_session_id: string
  public_token: string
}

export interface Company {
  id: number
  number_of_employees_estimate: string
  name: string
  address: string
  created_at: string
  is_active: boolean
  plaid_items: number[]
  status: string
  subscriptions: number[]
  updated_at: null | string
  users: number[]
}

export interface IsaClient {
  first_name: string
  last_name: string
  email: string
}

export interface IsaProgram {
  field: string
  duration: string
  description: string
}