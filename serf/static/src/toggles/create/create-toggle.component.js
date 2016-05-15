import React from 'react';
import CreateToggleModal from './create-toggle-modal.component.js';

export default function({modalShowing, actions, toggles}) {
	return (
		<div>
			<button
				className="cps-btn +primary"
				onClick={actions.showCreateToggleModal}
				>
					CREATE FEATURE
			</button>
			{
				modalShowing &&
				<CreateToggleModal
					actions={actions}
					toggles={toggles}
				/>
			}
		</div>
	);
}
