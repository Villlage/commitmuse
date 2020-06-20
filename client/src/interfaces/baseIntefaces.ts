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
