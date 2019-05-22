import React from 'react';
import styles from './toggle-controls.css';
import SearchBox from './search/search-box.component.js';
import CreateToggle from './create/create-toggle/create-toggle.component.js';
import CreateEnv from './create/create-env.component.js';
import SelectEnvs from './envs/select-envs.component.js';

export default function({toggles, searchToggles, refetchToggles}) {
	return (
		<div className={styles.root}>
			<div className={styles.left}>
				<SearchBox
          search={searchToggles}
				/>
				{/* <SelectEnvs */}
				{/* 	actions={actions} */}
				{/* 	toggles={toggles} */}
				{/* /> */}
			</div>
			<div className={styles.right}>
				<CreateToggle
          refetchToggles={refetchToggles}
				/>
				{/* <CreateEnv */}
				{/* 	actions={actions} */}
				{/* 	modalShowing={createState.envs.modalOpen} */}
				{/* 	toggles={toggles} */}
				{/* /> */}
			</div>
		</div>
	);
}
