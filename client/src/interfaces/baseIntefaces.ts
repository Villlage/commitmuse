import * as H from 'history'

export interface Dict {
  [key: string]: any
}

export interface ScreenProps {
  currentUser: User
  history: H.History
  fetchUser(): void
}

export interface User {
  id: number
  first_name: string
  last_name: string
  phone_number: string
  user_role: number
  confirmed_at: null | string
  email: string
  hourly_rate: number
  is_active: boolean
  profile_picture: string
  profile_picture_link: string
  created_at: string
  updated_at: string
}

export type SystemColors =
  | 'MainPrimary'
  | 'MainSecondary'
  | 'BodyLight'
  | 'BodyDarker'
  | 'Title'
  | 'Border'
  | 'BorderDark'
  | 'Background'
  | 'HoverPrimary'
  | 'HoverSecondary'
  | 'ActivePrimary'
  | 'ActiveSecondary'
  | 'MainSuccess'
  | 'ActiveSuccess'
  | 'MainError'
  | 'MainWarning'
  | 'MainInfo'
  | 'MainLight'
  | 'HoverSuccess'
  | 'HoverError'
  | 'ActiveError'
  | 'HoverWarning'
  | 'ActiveWarning'
  | 'HoverInfo'
  | 'ActiveInfo'
  | 'HoverLight'
  | 'ActiveLight'
  | 'HoverBorder'
  | 'ActiveBorder'

export interface ISA {
  current_income: number
  percentage: number
  cap: number
  time_to_be_paid: number
  status: string
  description: string
  coach_id: number
  client: any
  student: any
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