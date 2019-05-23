import React, { useState } from 'react';
import CreateToggleModal from './create-toggle-modal.component.js';

export default function CreateToggle (props) {

  const { refetchToggles } = props
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div>
      <button
        className="cps-btn +primary"
        onClick={() => setShowCreateModal(true)}
      >
        Create feature
      </button>
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
