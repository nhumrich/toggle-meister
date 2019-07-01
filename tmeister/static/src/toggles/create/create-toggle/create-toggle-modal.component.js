import React, { useState } from 'react';
import styles from './create-toggle-modal.css'
import { useCreateToggle } from '../create-hooks.js'
import Modal from 'common/modal/scroll-modal.component.js'
import Button from 'commonButton'
import { TextField } from '@material-ui/core'

export default function CreateToggleModal (props) {
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
      <Modal.Body>
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
      </Modal.Body>
      <Modal.BottomRow>
        <div className='flex-apart'>
          <Button
            variant='contained'
            color='primary'
            disabled={saving}
            showLoader={saving}
            onClick={() => {
              setCreateName(newToggleName)
            }}
          >
            Create feature
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
