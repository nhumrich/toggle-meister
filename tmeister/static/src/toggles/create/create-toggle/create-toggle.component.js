import React, { useState } from 'react';
import CreateToggleModal from './create-toggle-modal.component.js';
import Button from 'commonButton'

export default function CreateToggle (props) {

  const { refetchToggles } = props
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div>
      <Button
        color='primary'
        onClick={() => setShowCreateModal(true)}
      >
        Create feature
      </Button>
      {
        showCreateModal && (
          <CreateToggleModal
            hide={() => setShowCreateModal(false)}
            refetchToggles={refetchToggles}
          />
        )
      }
    </div>
  );
}
