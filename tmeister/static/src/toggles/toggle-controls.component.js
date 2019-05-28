import React from 'react';
import styles from './toggle-controls.css';
import SearchBox from './search/search-box.component.js';
import CreateToggle from './create/create-toggle/create-toggle.component.js';
import CreateEnv from './create/create-env/create-env.component.js';
import SelectEnvs from './envs/select-envs.component.js';

export default function TogglesControls (props) {
  const {toggles, searchToggles, refetchToggles, envs, setEnvs} = props
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <SearchBox
          search={searchToggles}
        />
        <SelectEnvs
          envs={envs}
          setEnvs={setEnvs}
          toggles={toggles}
        />
      </div>
      <div className={styles.right}>
        <CreateToggle
          refetchToggles={refetchToggles}
        />
        <CreateEnv
          refetchToggles={refetchToggles}
        />
      </div>
    </div>
  );
}
