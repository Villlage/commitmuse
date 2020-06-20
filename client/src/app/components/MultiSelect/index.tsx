import * as React from 'react'
import { useState } from 'react'
import { notEmptyArray, fixClass } from '../../../helpers/base'
import CheckBox from '../CheckBox'
import Button from '../Button'
import './style.scss'

export interface MultiSelectOptionItem {
  label: string
  selected?: boolean
}

interface MultiSelectProps {
  title: string
  label: string
  options: MultiSelectOptionItem[] | null
  onApply(options: MultiSelectOptionItem[]): void
  placeholder: string
  error?: string
  className?: string
  canAddNew?: boolean
  disabled?: boolean
}

export default function MultiSelect(props: MultiSelectProps) {
  const [options, setOptions] = useState(props.options)
  const [showOptions, setShowOptions] = useState(false)
  const [addNew, setAddNew] = useState(false)
  const [newItem, setNewItem] = useState('')
  const isError = props.error && props.error.length > 0
  const selected = props.options && props.options.filter(i => i.selected)
  const closeOptions = () => setShowOptions(false)

  return (
    <div
      className={`MultiSelect-component${fixClass(isError && 'has-error')}${fixClass(props.className)}${fixClass(
        props.disabled && 'disabled',
      )}`}
    >
      {props.label && <label>{props.label}</label>}
      <div
        onClick={() => !props.disabled && setShowOptions(!showOptions)}
        className={`placeholder${fixClass(notEmptyArray(selected) && 'value')}`}
      >
        {notEmptyArray(selected) ? (
          <div className="selected">
            {selected!.map((option, index) => (
              <span key={index}>{option.label}</span>
            ))}
          </div>
        ) : (
          props.placeholder
        )}
        <div className="icons">
          <img src="/web/assets/icons/select_up.svg" alt="select_up" />
          <img src="/web/assets/icons/select_down.svg" alt="select_down" />
        </div>
      </div>
      {showOptions && notEmptyArray(options) && (
        <section className="overlay">
          <div className="options">
            <header>
              {props.title}
              <img src="/web/assets/icons/close.svg" alt="close" onClick={closeOptions} />
            </header>
            <div className="scroll">
              {options!.map((option, index) => (
                <div
                  className={`option${fixClass(option.selected && 'selected')}`}
                  key={index}
                  onClick={() => {
                    const clone = [...options!]
                    clone[index].selected = !clone[index].selected
                    setOptions(clone)
                  }}
                >
                  <CheckBox value={!!option.selected} label={option.label} />
                </div>
              ))}
            </div>
            <footer>
              {props.canAddNew && (
                <Button background="MainLight" onClick={() => setAddNew(true)}>
                  Add new
                </Button>
              )}
              <Button
                onClick={() => {
                  props.onApply(options!)
                  closeOptions()
                }}
              >
                Apply
              </Button>
            </footer>
          </div>
          {props.canAddNew && addNew && (
            <div className="new-item">
              <header>
                Add new item
                <img
                  src="/web/assets/icons/close.svg"
                  alt="close"
                  onClick={() => {
                    setNewItem('')
                    setAddNew(false)
                  }}
                />
              </header>
              <div className="body">
                <input value={newItem} type="text" placeholder="New item" onChange={e => setNewItem(e.target.value)} />{' '}
                <Button
                  onClick={() => {
                    setOptions([...options!, { label: newItem, selected: true }])
                    setNewItem('')
                    setAddNew(false)
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
      {isError && <p className="error">{props.error}</p>}
    </div>
  )
}
