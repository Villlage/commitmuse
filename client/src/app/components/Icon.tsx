import * as React from 'react'
import { CSSProperties } from 'react'

const iconsFolder = '/web/assets/icons/'

const generateIconLink = (icon: SystemIcons | string) => iconsFolder + icon + '.svg'

export const icons: any = {
  transparent_logo: generateIconLink('transparent_logo'),
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
  'caret-down': generateIconLink('caret-down'),
  bell: generateIconLink('bell'),
  arrow_to_button: generateIconLink('arrow_to_button'),
  'chevron-right': generateIconLink('chevron-right'),
  'arrow-right': generateIconLink('arrow-right'),
  eye: generateIconLink('eye'),
  mail: generateIconLink('mail'),
  'file-download': generateIconLink('file-download'),
  key: generateIconLink('key'),
  gear: generateIconLink('gear'),
  globe: generateIconLink('globe'),
  building: generateIconLink('building'),
  location: generateIconLink('location'),
  'check-circle': generateIconLink('check-circle'),
  'blue-plus': generateIconLink('blue-plus'),
  globus: generateIconLink('globus'),
  'money-check': generateIconLink('money-check'),
  'user-tie': generateIconLink('user-tie'),
  'user-graduate': generateIconLink('user-graduate'),
  home: generateIconLink('home'),
  file: generateIconLink('file'),
  'credit-card': generateIconLink('credit-card'),
  university: generateIconLink('university'),
  round_blue_user: generateIconLink('round_blue_user'),
  round_blue_doc: generateIconLink('round_blue_doc'),
  'user-circle': generateIconLink('user-circle'),
  'arrow-left': generateIconLink('arrow-left'),
  emy_owens: generateIconLink('emy_owens'),
  menu_line: generateIconLink('menu-line'),
}

export type SystemIcons =
  | 'file-download'
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
  | 'caret-down'
  | 'bell'
  | 'arrow_to_button'
  | 'chevron-right'
  | 'arrow-right'
  | 'eye'
  | 'mail'
  | 'key'
  | 'gear'
  | 'globe'
  | 'building'
  | 'location'
  | 'globus'
  | 'check-circle'
  | 'blue-plus'
  | 'money-check'
  | 'user-tie'
  | 'user-graduate'
  | 'home'
  | 'file'
  | 'credit-card'
  | 'university'
  | 'round_blue_user'
  | 'round_blue_doc'
  | 'user-circle'
  | 'arrow-left'
  | 'emy_owens'
  | 'menu_line'
  | 'transparent_logo'

interface IconProps {
  icon: SystemIcons
  color?: string
  style?: CSSProperties
  disabled?: boolean
  animated?: boolean
  className?: string
  onClick?(): void
}

export default function Icon(props: IconProps) {
  const icon = props.icon.replace(/ /g, '')
  return !!icons[icon] ? (
    props.color ? (
      <div
        style={{
          mask: `url(${icons[icon]})`,
          backgroundColor: props.color,
        }}
      />
    ) : (
      <img
        onClick={props.onClick}
        src={icons[icon]}
        alt={props.icon + 'icon'}
        style={props.style}
        className={props.className}
      />
    )
  ) : (
    <span>No such icon</span>
  )
}
