import React, { useState } from 'react';
import styles from './create-env-modal.css';
import { useCreateEnv } from '../create-hooks.js'
import Modal from '../../../common/modal/modal.component.js'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  cancelButton: {
    marginLeft: '8px'
  },
  buttonBar: {
    marginTop: '16px'
  }
}))

export default function CreateEnvModal (props) {
  const classes = useStyles();
  const { hide, refetchToggles } = props
  const [ newEnv, setNewEnv ] = useState('')
  const [ createName, setCreateName ] = useState('')
  const [ saving, saveCompleted ] = useCreateEnv(createName)
  if (saveCompleted) {
    refetchToggles()
    hide()
  }
  return (
    <Modal
      headerText='Create a new environment'
      closeAction={hide}
    >
      <div>
        <TextField
          id='new-environment-name'
          label='Environment name'
          disabled={saving}
          value={newEnv}
          onChange={(e) => setNewEnv(e.target.value)}
          autoFocus
          onKeyPress={e => {
            if (e.charCode === 13) {
              setCreateName(e.target.value)
            }
          }}
        >
        </TextField>
        <div className={classes.buttonBar}>
          <Button
            variant='contained'
            color='primary'
            disabled={saving}
            onClick={() => {
              setCreateName(newEnv)
            }}
          >
            Create Environment
          </Button>
          <Button
            color='secondary'
            className={classes.cancelButton}
            onClick={hide}
          >
            Nevermind
          </Button>
        </div>
      </div>
    </Modal>
  );
}
