import React from 'react'
import './style.scss'

type AutoComplete =
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'url'
  | 'photo'

interface FormFieldProps {
  disabled?: boolean
  label: string
  placeholder: string
  value: number | string | null
  onChange(e: string): void
  onEnter?(): void
  autocomplete?: AutoComplete
  isPhoneNumber?: boolean
  error?: string | undefined | null
  type?: 'email' | 'text' | 'number' | 'password'
}

export default function FormField(props: FormFieldProps) {
  const isError = props.error && props.error.length > 0
  return (
    <div className={`FormField-component${isError ? ' has-error' : ''}`}>
      <label>{props.label}</label>
      {props.isPhoneNumber ? (
        <div className="phone_number">
          <div className="phone_code">
            <img src="/web/assets/icons/usa.svg" alt="" />
            <p>+1</p>
          </div>
          <input
            autoComplete={props.autocomplete}
            type="text"
            value={props.value || ''}
            placeholder={props.placeholder}
            onChange={({ target: { value } }) => Number.isInteger(Number(value)) && props.onChange(value)}
            onKeyUp={e => e.keyCode === 13 && props.onEnter && props.onEnter()}
          />
        </div>
      ) : (
        <input
          disabled={props.disabled}
          autoComplete={props.autocomplete}
          type={props.type || 'text'}
          value={props.value || ''}
          placeholder={props.placeholder}
          onChange={e => props.onChange(e.target.value)}
          onKeyUp={e => e.keyCode === 13 && props.onEnter && props.onEnter()}
        />
      )}
      {isError && <p className="error">{props.error}</p>}
    </div>
  )
}
