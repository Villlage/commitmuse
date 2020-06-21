import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

interface LoaderProps {}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  img {
    width: 40px;
    position: relative;
    top: -77px;
  }
  svg {
    -webkit-transform-origin: 50% 65%;
    transform-origin: 50% 65%;
  }

  svg polygon {
    stroke-dasharray: 17;
    -webkit-animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
    animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
  }

  @-webkit-keyframes dash {
    to {
      stroke-dashoffset: 136;
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 136;
    }
  }
  @-webkit-keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

export default function Loader(props: LoaderProps) {
  return (
    <Wrapper>
      <svg id="triangle" width="150px" height="150px" viewBox="-3 -4 39 39">
        <polygon fill="#FFFFFF" stroke="#954bde" strokeWidth="1" points="16,0 32,32 0,32" />
      </svg>
      <Icon icon="logo" />
    </Wrapper>
  )
}
