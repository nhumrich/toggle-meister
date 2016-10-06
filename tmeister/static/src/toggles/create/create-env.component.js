import React from 'react';
import CreateEnvModal from './create-env-modal.component.js';

export default function({actions, modalShowing, toggles}) {
	return (
		<div>
			<button
				className="cps-btn +secondary"
				onClick={actions.showCreateEnvModal}
				>
					Create environment
			</button>
			{
				modalShowing &&
				<CreateEnvModal
					actions={actions}
					toggles={toggles}
				/>
			}
		</div>
	);
}
