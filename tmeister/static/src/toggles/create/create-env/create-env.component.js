import React, { useState } from 'react';
import CreateEnvModal from './create-env-modal.component.js';

export default function CreateEnv (props) {
  const { refetchToggles } = props
  const [showCreateModal, setShowCreateModal] = useState(false)
	return (
		<div>
			<button
				className="cps-btn +secondary"
        onClick={() => setShowCreateModal(true)}
				>
					Create environment
			</button>
			{
				showCreateModal &&
				<CreateEnvModal
          hide={() => setShowCreateModal(false)}
          refetchToggles={refetchToggles}
				/>
			}
		</div>
	);
}
