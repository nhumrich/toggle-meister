import React from 'react'
import ScrollModal from 'common/modal/scroll-modal.component.js'
import { makeStyles } from '@material-ui/core/styles'
import { Icon, Typography } from '@material-ui/core'
import Button from 'commonButton'
import { useDeleteReleaseNote } from '../release-notes.hooks.js'

const useStyles = makeStyles(theme => ({
  buttonBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  warningText: {
    color: theme.palette.error.main,
  }
}))

export default function DeleteReleaseNote (props) {
  const { note, close, refetch } = props
  const c = useStyles()
  const [ deleteNote, deletePending, deleted ] = useDeleteReleaseNote()
  if (deleted) {
    close()
    refetch()
  }
  return (
    <ScrollModal
      closeAction={close}
      headerText={`Confirm Delete`}
    >
      <ScrollModal.Body>
        <div>
          <Typography variant='body1'>
            This is a HARD delete. Deleting a release note will immediately stop it from being returned in the API.
            You should consider if you really want to PERMANENTLY remove this release note.
          </Typography>
          <Typography variant='body1' className={c.warningText}>
            There is no way to recover deleted notes.
          </Typography>
        </div>
      </ScrollModal.Body>
      <ScrollModal.BottomRow>
        <div className={c.buttonBar}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              deleteNote(note)
            }}
            showLoader={deletePending}
            disabled={deletePending}
            type={'button'}
          >
            <Icon>
              warning
            </Icon>
            Delete
          </Button>
          <Button
            variant='contained'
            type={'button'}
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </ScrollModal.BottomRow>
    </ScrollModal>
  )
}
