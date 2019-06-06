import React, { useState } from 'react';
import CreateEnvModal from './create-env-modal.component.js';
import Button from 'commonButton'

export default function CreateEnv (props) {
  const { refetchToggles, refetchEnvs } = props
  const [showCreateModal, setShowCreateModal] = useState(false)
  return (
    <div>
      <Button
        onClick={() => setShowCreateModal(true)}
      >
        Create environment
      </Button>
      {
        showCreateModal &&
          <CreateEnvModal
            hide={() => setShowCreateModal(false)}
            refetchEnvs={refetchEnvs}
            refetchToggles={refetchToggles}
          />
      }
    </div>
  );
}
