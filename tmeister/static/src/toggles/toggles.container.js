import React, {useState} from 'react';
import ToggleControls from './toggle-controls.component.js';
import ToggleTable from './table/toggle-table.component.js';
import styles from './toggles.container.css';
import { useFetchToggles, useFilterToggles } from './toggles.hooks.js'

export default function TogglesContainer (props) {
  const [ search, setSearch ] = useState()
  const [ toggles, refetch ] = useFetchToggles()
  const [ envs, setEnvs ] = useState([])
  const filteredToggles = useFilterToggles(envs, toggles, search)

  return (
    <div className={`${styles.root}`}>
      <h2>
        Manage feature toggles
      </h2>
      <div className={`cps-card cps-padding-16`}>
        <ToggleControls
          toggles={toggles}
          searchToggles={setSearch}
          refetchToggles={refetch}
          setEnvs={setEnvs}
          envs={envs}
        />
        <ToggleTable
          toggles={filteredToggles}
          refetchToggles={refetch}
        />
      </div>
    </div>
  );
}
