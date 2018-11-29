import React from 'react'
import styles from './simple-button.styles.css'

export default class SimpleButton extends React.Component {
  state = {
    disabled: false,
    loaderWidth: null,
    loaderHeight: null,
  }

  render () {
    if (this.props.showLoader) {
      return (
        <span className={`cps-loader ${styles.loader} ${this.props.customElement.disabled ? styles.disabledWithLoader : ''}`}>
          <span />
          <span />
          <span />
        </span>
      )
    } else {
      return (
        <button
          onClick={this.handleClick}
        >
          {this.props.children}
        </button>
      )
    }
  }

  handleClick = () => {
    if (this.props.disableOnClick) {
      this.setState({disabled: true}, this.callOnClick)
    } else {
      this.callOnClick
    }
  }

  callOnClick = () => {
    if (this.props.onClick) {
      this.props.onClick()
    } else {
      console.warn(`onClick wasn't provided`)
    }
  }

}
