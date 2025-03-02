import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends React.Component<{children: ReactNode, selector:string}> {
  public element?: HTMLElement
  componentDidMount () {
    const el = document.querySelector(this.props.selector)
    if (el instanceof HTMLElement) this.element = el
  }

  render () {
    if (this.element === undefined) {
      return null
    }

    return ReactDOM.createPortal(this.props.children, this.element)
  }
}