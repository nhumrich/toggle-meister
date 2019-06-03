import React, {useState} from 'react'
import Modal from '../../common/modal/modal.component.js'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  inputRow: {
    marginBottom: '8px',
  },
  buttonBar: {
    marginTop: '16px'
  }
}))

export default function CreateEditReleaseNote (props) {
  const isEdit = !!props.releaseNote
  const classes = useStyles()
  const { releaseNote = {}, close} = props
  const [ title, setTitle ] = useState(() => releaseNote.title || '')
  const [ body, setBody] = useState(() => releaseNote.body || '')
  return (
    <Modal
      headerText={isEdit ? `Edit Note` : 'Create Note'}
      closeAction={close}
    >
      <div>
        <form
          noValidate
          autoComplete='off'
          id='create-edit-release-note'
          onSubmit={handleSubmit}
        >
          <div className={classes.inputRow}>
            <TextField
              variant='outlined'
              fullWidth
              id='release-note-title'
              label='Note Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.inputRow}>
            <TextField
              variant='outlined'
              multiline
              fullWidth
              rows="40"
              id='release-note-Body'
              label='Release Note Body'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className={classes.buttonBar}>
            <Button
              variant='contained'
              color='primary'
              type={'submit'}
            >
              { isEdit ? 'Save' : 'Update'} note
            </Button>
            <Button
              variant='contained'
              type={'button'}
              onClick={close}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )

  function handleSubmit(e) {
    e.preventDefault()
    console.log('submit')
  }
}
