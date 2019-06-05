import React from 'react'
import ScrollModal from '../../common/modal/scroll-modal.component.js'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Icon } from '@material-ui/core'
import { useDeleteReleaseNote } from '../release-notes.hooks.js'

const useStyles = makeStyles(theme => ({
  buttonBar: {
    display: 'flex',
    justifyContent: 'space-between',
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
      headerText={`Delete Note?`}
    >
      <ScrollModal.Body>
        <div>
          <a target='_blank' rel='noopener noreferrer' href='https://youtu.be/SZvElCoK6so?t=9'>
            KENOOOOOOOOOOBIIIII!!!!!!!!!!!!
          </a>
        </div>
      </ScrollModal.Body>
      <ScrollModal.BottomRow>
        <div className={c.flex}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              deleteNote(note)
            }}
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
