import React, { useState } from 'react';
import styles from './create-toggle-modal.css'
import { useCreateToggle } from '../create-hooks.js'
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

export default function CreateToggleModal (props) {
  const classes = useStyles();
  const { hide, refetchToggles } = props
  const [ newToggleName, setNewToggleName ] = useState('')
  const [ createName, setCreateName ] = useState('')
  const [ saving, saveCompleted ] = useCreateToggle(createName)
  if (saveCompleted) {
    refetchToggles()
    hide()
  }
  return (
    <Modal
      headerText={'Create a new feature toggle'}
      closeAction={hide}
    >
      <div>
        <TextField
          id='new-toggle-name'
          label='Feature Toggle Name'
          disabled={saving}
          value={newToggleName}
          onChange={(e) => setNewToggleName(e.target.value)}
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
              setCreateName(newToggleName)
            }}
          >
            Create feature
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
