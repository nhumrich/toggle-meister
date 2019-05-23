import React, { useState } from 'react'
import ToggleProdModal from '../../toggle-prod-modal.component.js'
import { useChangeFeatureStatus } from '../../../toggles.hooks.js'

export default function IndividualToggle (props) {
  const { toggle, refetchToggles } = props
  const [ toggleConfirmModal, setToggleConfirmModal ] = useState(false)
  const [ setToggleToChange, setNewState ] = useChangeFeatureStatus(refetchToggles)
  return (
    <td key={toggle.toggle.env}>
      <label className="cps-toggle">
        {
          toggle.toggle.env === 'production' ? (
            <input
              type="checkbox"
              checked={toggle.toggle.state === 'ON'}
              onChange={(e) => {
                setToggleConfirmModal(true)
              }}
            />
          ) : (
            <input
              type="checkbox"
              checked={toggle.toggle.state === 'ON'}
              onChange={() => changeToggle(toggle)}
            />

          )
        }
        <span />
      </label>
      {
        toggleConfirmModal && (
          <ToggleProdModal
            toggle={toggle}
            toggleWillBeOn={toggle.toggle.state === 'OFF'}
            close={() => {
              setToggleToChange()
              setToggleConfirmModal(false)}
            }
            performChange={() => changeToggle(toggle)}
          />
        )
      }
    </td>
  );

  function changeToggle(toggle) {
    if (toggle.toggle.state === 'ON') {
      setNewState('OFF')
    } else {
      setNewState('ON')
    }
    setToggleToChange(toggle.toggle)
    setToggleConfirmModal(false)
  }
}
