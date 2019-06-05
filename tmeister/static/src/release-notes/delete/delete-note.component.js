import React from 'react'
import ScrollModal from '../../common/modal/scroll-modal.component.js'
import { Button } from '@material-ui/core'

export default function DeleteReleaseNote (props) {
  const { note, close } = props
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
        <Button>
          Button
        </Button>
      </ScrollModal.BottomRow>
    </ScrollModal>
  )
}
