import React, { useState } from 'react';
import Button from 'commonButton'
import Modal from 'common/modal/scroll-modal.component.js'
import { TextField, Switch, FormGroup, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rollingInputs: {
    margin: '8px 0px',
  }
}))

export default function ToggleProdModal (props) {
  const classes = useStyles();
  const { toggle, performChange, close, toggleWillBeOn, loading } = props
  const [ days, setDays ] = useState(3)
  const [ rolling, setRolling ] = useState(false)
  return (
    <Modal
      headerText='Alter Production feature toggle'
      closeAction={close}
    >
      <Modal.Body>
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
      </Modal.Body>
      <Modal.BottomRow>
        <div className={classes.buttonRow}>
          <Button
            color="primary"
            onClick={() => {
              if (rolling) {
                performChange(`ROLL:${days}`)
              } else {
                performChange()
              }
            }}
            disabled={loading}
            showLoader={loading}
          >
            Do it!
          </Button>
          <Button variant="text" onClick={close}>
            Cancel
          </Button>
        </div>
      </Modal.BottomRow>
    </Modal>
  );
}
