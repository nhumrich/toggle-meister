import React from 'react'
import Button from 'commonButton'
import Modal from 'common/modal/scroll-modal.component.js'

export default function ConfirmPause (props) {
  const { confirm, close } = props
  return (
    <Modal
      headerText='Confirm Pause'
      closeAction={close}
    >
      <Modal.Body>
        <div>
          Are you sure you want to pause the rollout for 48 hours? We will automatically resume the rollout after 48 hours.
        </div>
      </Modal.Body>
      <Modal.BottomRow>
        <Button
          color='primary'
          onClick={() => {
            confirm()
            close()
          }}
        >
          Yes
        </Button>
        <Button variant='text' onClick={close}>
          No
        </Button>
      </Modal.BottomRow>
    </Modal>
  )
}
