import * as React from 'react'
import { CSSProperties } from 'react'

const iconsFolder = 'assets/icons/'

const generateIconLink = (icon: SystemIcons | string) => iconsFolder + icon + '.svg'

export const icons: any = {
  active_star: generateIconLink('active_star'),
  arrow_right: generateIconLink('arrow_right'),
  save_profile: generateIconLink('save_profile'),
  select_down: generateIconLink('select_down'),
  select_up: generateIconLink('select_up'),
  save_pdf: generateIconLink('save_pdf'),
  share: generateIconLink('share'),
  close: generateIconLink('close'),
  star: generateIconLink('star'),
  usa: generateIconLink('usa'),
  pdf: generateIconLink('pdf'),
  gigs_handshake: generateIconLink('gigs_handshake'),
  briefcase: generateIconLink('briefcase'),
  refer: generateIconLink('refer'),
  certificate: generateIconLink('certificate'),
  round_down: generateIconLink('round_down'),
  checkmark: generateIconLink('checkmark'),
  logo: generateIconLink('logo'),
  calendar: generateIconLink('calendar'),
  person: generateIconLink('person'),
  share_gray: generateIconLink('share_gray'),
  plus: generateIconLink('plus'),
  star_outline: generateIconLink('star_outline'),
  emptyProjects: generateIconLink('emptyProjects'),
  send: generateIconLink('Send'),
  sendWhite: generateIconLink('SendWhite'),
  arrow_up: generateIconLink('arrow_up'),
  tooltip_arrow: generateIconLink('tooltip_arrow'),
  delete: generateIconLink('Delete'),
  edit: generateIconLink('Edit'),
  account: generateIconLink('account'),
  company: generateIconLink('company'),
  new_isa_plus: generateIconLink('new_isa_plus'),
  pencil: generateIconLink('pencil'),
  question_circle: generateIconLink('question-circle'),
  question_circle_active: generateIconLink('question-circle-active'),
  code: generateIconLink('code'),
  empty_isa: generateIconLink('empty_isa'),
}

export type SystemIcons =
  | 'new_isa_plus'
  | 'active_star'
  | 'arrow_right'
  | 'close'
  | 'pdf'
  | 'save_pdf'
  | 'save_profile'
  | 'select_down'
  | 'select_up'
  | 'share'
  | 'star'
  | 'usa'
  | 'gigs_handshake'
  | 'briefcase'
  | 'refer'
  | 'certificate'
  | 'round_down'
  | 'checkmark'
  | 'logo'
  | 'calendar'
  | 'person'
  | 'share_gray'
  | 'plus'
  | 'star_outline'
  | 'emptyProjects'
  | 'send'
  | 'sendWhite'
  | 'arrow_up'
  | 'tooltip_arrow'
  | 'delete'
  | 'edit'
  | 'account'
  | 'company'
  | 'pencil'
  | 'question_circle'
  | 'question_circle_active'
  | 'code'
  | 'empty_isa'

interface IconProps {
  icon: SystemIcons
  style?: CSSProperties
  disabled?: boolean
  animated?: boolean
  className?: string
  onClick?(): void
}

export default function Icon(props: IconProps) {
  const icon = props.icon.replace(/ /g, '')
  return !!icons[icon] ? (
    <img
      onClick={props.onClick}
      src={'/' + icons[icon]}
      alt={props.icon + 'icon'}
      style={props.style}
      className={props.className}
    />
  ) : (
    <span>No such icon</span>
  )
}
