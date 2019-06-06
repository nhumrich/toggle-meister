import React, { useState } from 'react';
import SimpleButton from 'commonButton'
import Modal from 'common/modal/modal.component.js'
import { TextField, Switch, FormGroup, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  cancelButton: {
    marginLeft: '8px'
  },
  buttonBar: {
    marginTop: '16px'
  },
  rollingInputs: {
    margin: '8px 0px',
  }
}))

export default function ToggleProdModal (props) {
  const classes = useStyles();
  const { toggle, performChange, close, toggleWillBeOn } = props
  const [ days, setDays ] = useState(3)
  const [ rolling, setRolling ] = useState(false)
  return (
    <Modal
      headerText='Alter Production feature toggle'
      closeAction={close}
    >
      <div>
        <div>
          This really will have an immediate impact on the production environment and could potentially break things for customers.
        </div>
        {
          toggleWillBeOn && (
            <div className={classes.rollingInputs}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={rolling}
                      onChange={(e) => setRolling(e.target.checked)}
                    />
                  }
                  label='Rolling Deployment'
                />
              </FormGroup>
              {
                rolling && (
                  <TextField
                    label='Days until 100% deployed'
                    type='number'
                    min={1}
                    max={50}
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                )
              }
            </div>
          )
        }
        {
          toggleWillBeOn ? (
            <div>
              Are you sure you want to <strong>turn '{toggle.feature}' {toggleWillBeOn ? 'on' : 'off'} { rolling ? 'with' : 'without'}</strong> a rolling deploy?
            </div>
          ) : (
            <div>
              Are you sure you want to <strong>turn '{toggle.feature}' {toggleWillBeOn ? 'on' : 'off'}</strong> for ALL users?
            </div>
          )
        }
      </div>
      <div className={classes.buttonBar}>
        <SimpleButton
          actionType="primary"
          onClick={() => {
            if (rolling) {
              performChange(`ROLL:${days}`)
            } else {
              performChange()
            }
          }}
          disableOnClick={true}
        >
          I know what I am doing
        </SimpleButton>
        <SimpleButton className={classes.cancelButton} actionType="flat" onClick={close}>
          Nevermind
        </SimpleButton>
      </div>
    </Modal>
  );
}
