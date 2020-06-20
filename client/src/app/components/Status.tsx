import React, { CSSProperties } from 'react'
import styled from 'styled-components'

interface StatusProps {
  style?: CSSProperties
  children: any
  background?: string
  className?: string
}

const StyledStatus = styled.div<any>`
  background: ${({ background }) => background || '#f2f5f9'};
  font-family: Gothic A1, sans-serif;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 6px 8px;
  border-radius: 3px;
  font-weight: bold;
  color: #354151;
  text-transform: capitalize;
`

const Status = (props: StatusProps) => (
  <StyledStatus className={props.className} style={props.style} background={props.background}>
    {props.children}
  </StyledStatus>
)
export default Status
