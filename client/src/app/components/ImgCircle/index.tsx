import React from 'react'
import './style.scss'
import classNames from 'classnames'
import Avatar from 'icons/person.svg'

interface ImgCircleProps {
  src?: string
  size: string
}

const ImgCircle = (props: ImgCircleProps) => {
  const { src, size } = props

  return (
    <div className={'ImgCircle-component'}>
      <img src={src || Avatar} className={classNames(size, { ['hasBorder']: !src })} />
    </div>
  )
}

ImgCircle.defaultProps = {
  size: 'large',
}

export default ImgCircle
