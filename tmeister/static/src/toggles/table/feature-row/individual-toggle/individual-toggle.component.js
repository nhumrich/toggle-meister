import React, { useState } from 'react'
import ToggleProdModal from '../../toggle-prod-modal.component.js'
import { useChangeFeatureStatus } from '../../../toggles.hooks.js'
import styles from './individual-toggle.styles.css'
import ToggleAndStatus from './actual-toggle-and-percentage.component.js'
import { TableRow, TableCell, Switch } from '@material-ui/core'

export default function IndividualToggle (props) {
  const { toggle, refetchToggles } = props
  const [ toggleConfirmModal, setToggleConfirmModal ] = useState(false)
  const [ setToggleToChange, setNewState ] = useChangeFeatureStatus(refetchToggles)
  const { state, env } = toggle.toggle
  const isOn = state === 'ROLL' || state === 'PAUSE' || state === 'ON'
  return (
    <TableCell key={toggle.toggle.env}>
      <label className="cps-toggle">
        {
          toggle.toggle.env === 'production' ? (
            <Switch
              checked={toggle.toggle.state === 'ON'}
              onChange={(e) => {
                setToggleConfirmModal(true)
              }}
            />
          ) : (
            <Switch
              checked={toggle.toggle.state === 'ON'}
              onChange={() => changeToggle(toggle.toggle)}
            />

          )
        }
      </label>
      {
        toggleConfirmModal && (
          <ToggleProdModal
            toggle={toggle.toggle}
            toggleWillBeOn={toggle.toggle.state === 'OFF'}
            close={() => {
              setToggleToChange()
              setToggleConfirmModal(false)}
            }
            performChange={(state) => {
              changeToggle(toggle.toggle, state)
            }}
          />
        )
      }
    </TableCell>
  );

  function changeToggle(toggle, state) {
    if (state) {
      setNewState(state)
    } else if (toggle.state === 'ON' || toggle.state === 'ROLL' || toggle.state === 'PAUSE') {
      setNewState('OFF')
    } else {
      setNewState('ON')
    }
    setToggleToChange(toggle)
    setToggleConfirmModal(false)
  }
}

  {/* <ToggleAndStatus */}
  {/*   isOn={isOn} */}
  {/*   toggle={toggle.toggle} */}
  {/*   onChange={env === 'production' ? */}
  {/*       () => setToggleConfirmModal(true) : */}
  {/*       () => changeToggle(toggle.toggle) */}
  {/*   } */}
  {/*   changeToggle={changeToggle} */}
  {/* /> */}
