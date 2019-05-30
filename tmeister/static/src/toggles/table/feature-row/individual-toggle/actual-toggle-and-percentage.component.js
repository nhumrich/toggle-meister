import React from 'react'
import styles from './individual-toggle.styles.css'
import Percentage from './percentage.component.js'
import { Switch } from '@material-ui/core'

export default function ToggleAndStatus (props) {
  const { onChange, changeToggle, isOn, toggle } = props
  const { state, env, current_percent } = toggle
  return (
    <div className={styles.ToggleAndStatus}>
      <Switch
        checked={isOn}
        onChange={onChange}
      />
      {
        (isOn && state === 'ROLL' || state === 'PAUSE') && (
          <Percentage
            changeToggle={changeToggle}
            toggle={toggle}
          />
        )
      }
    </div>

  )
}
