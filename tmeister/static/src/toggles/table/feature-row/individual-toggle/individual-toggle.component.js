import React, { useState } from 'react'
import ToggleProdModal from '../../toggle-prod-modal.component.js'
import { useChangeFeatureStatus } from '../../../toggles.hooks.js'
import styles from './individual-toggle.styles.css'
import Percentage from './percentage.component.js'

export default function IndividualToggle (props) {
  const { toggle, refetchToggles } = props
  const [ toggleConfirmModal, setToggleConfirmModal ] = useState(false)
  const [ setToggleToChange, setNewState ] = useChangeFeatureStatus(refetchToggles)
  const { state, env } = toggle.toggle
  const isOn = state === 'ROLL' || state === 'PAUSE' || state === 'ON'
  return (
    <td key={toggle.toggle.env}>
      <ToggleAndStatus
        isOn={isOn}
        toggle={{...toggle.toggle, state: 'ROLL', current_percent: 40}}
        onChange={env === 'production' ? () => setToggleConfirmModal(true) : () => changeToggle(toggle.toggle)}
        changeToggle={changeToggle}
      />
      {
        toggleConfirmModal && (
          <ToggleProdModal
            toggle={toggle}
            toggleWillBeOn={toggle.toggle.state === 'OFF'}
            close={() => {
              setToggleToChange()
              setToggleConfirmModal(false)}
            }
            performChange={() => changeToggle(toggle.toggle)}
          />
        )
      }
    </td>
  );

  function changeToggle(toggle, state) {
    console.log('toggle', toggle, 'state', state)
    if (state) {
      setNewState(state)
    } else if (toggle.toggle.state === 'ON') {
      setNewState('OFF')
    } else {
      setNewState('ON')
    }
    setToggleToChange(toggle)
    setToggleConfirmModal(false)
  }
}

function ToggleAndStatus (props) {
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
        (state === 'ROLL' || state === 'PAUSE') && (
          <Percentage
            changeToggle={changeToggle}
            toggle={toggle}
          />
        )
      }
    </div>

  )
}
