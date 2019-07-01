import React, { useState } from 'react';
import styles from './create-env-modal.css';
import { useCreateEnv } from '../create-hooks.js'
import Modal from 'common/modal/scroll-modal.component.js'
import Button from 'commonButton'
import { TextField } from '@material-ui/core'

export default function CreateEnvModal (props) {
  const { hide, refetchToggles, refetchEnvs } = props
  const [ newEnv, setNewEnv ] = useState('')
  const [ createName, setCreateName ] = useState('')
  const [ saving, saveCompleted ] = useCreateEnv(createName)
  if (saveCompleted) {
    refetchEnvs()
    refetchToggles()
    hide()
  }
  return (
    <Modal
      headerText='Create a new environment'
      closeAction={hide}
    >
      <Modal.Body>
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
      </Modal.Body>
      <Modal.BottomRow>
        <div className={'tm-flex-apart'}>
          <Button
            variant='contained'
            color='primary'
            disabled={saving}
            showLoader={saving}
            onClick={() => {
              setCreateName(newEnv)
            }}
          >
            Create Environment
          </Button>
          <Button
            variant='text'
            onClick={hide}
          >
            Cancel
          </Button>
        </div>
      </Modal.BottomRow>
    </Modal>
  );
}
