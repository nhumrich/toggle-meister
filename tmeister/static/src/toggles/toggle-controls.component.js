import React from 'react';
import styles from './toggle-controls.css';
import SearchBox from './search/search-box.component.js';
import CreateToggle from './create/create-toggle.component.js';
import CreateEnv from './create/create-env.component.js';
import SelectEnvs from './envs/select-envs.component.js';

export default function({toggles, actions, createState}) {
	return (
		<div className={styles.root}>
			<div className={styles.left}>
				<SearchBox
					actions={actions}
				/>
				<SelectEnvs
					actions={actions}
					toggles={toggles}
				/>
			</div>
			<div className={styles.right}>
				<CreateToggle
					actions={actions}
					modalShowing={createState.toggles.modalOpen}
					toggles={toggles}
				/>
				<CreateEnv
					actions={actions}
					modalShowing={createState.envs.modalOpen}
					toggles={toggles}
				/>
			</div>
		</div>
	);
}
