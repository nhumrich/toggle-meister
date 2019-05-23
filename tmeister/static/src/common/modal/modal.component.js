import React from 'react'
import ReactDOM from 'react-dom'

export default function Modal (props) {
  const { children } = props
  return ReactDOM.createPortal(
    children,
    document.body
  )
}
