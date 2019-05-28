import React from 'react'
import styles from './individual-toggle.styles.css'
import Percentage from './percentage.component.js'

export default function ToggleAndStatus (props) {
  const { onChange, changeToggle, isOn, toggle } = props
  const { state, env, current_percent } = toggle
  return (
    <div className={styles.ToggleAndStatus}>
      <label className="cps-toggle">
        <input
          type="checkbox"
          checked={isOn}
          onChange={onChange}
        />
        <span />
      </label>
      {
        (isOn && state === 'ROLL' || state === 'PAUSE') && false /*toggled off */ && (
          <Percentage
            changeToggle={changeToggle}
            toggle={toggle}
          />
        )
      }
    </div>

  )
}
