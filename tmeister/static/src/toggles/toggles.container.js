import React, {useState} from 'react';
import ToggleControls from './toggle-controls.component.js';
import ToggleTable from './table/toggle-table.component.js';
import styles from './toggles.container.css';
import { useFetchToggles } from './toggles.hooks.js'

export default function TogglesContainer (props) {
  const [ search, setSearch ] = useState()
  const [ toggles, refetch ] = useFetchToggles(search)

  return (
    <div className={`${styles.root}`}>
      <h2>
        Manage feature toggles
      </h2>
      <div className={`cps-card cps-padding-16`}>
        <ToggleControls
          searchToggles={setSearch}
          refetchToggles={refetch}
        />
        <ToggleTable
          toggles={toggles}
        />
      </div>
    </div>
  );
}
