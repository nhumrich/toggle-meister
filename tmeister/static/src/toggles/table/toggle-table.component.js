import React from 'react';
import { getEnvList, groupTogglesByFeature, fuzzySearch } from './toggle-table.helpers.js';
import DeleteFeatureModal from '../delete/delete-feature-modal.component.js';
import ToggleProdModal from './toggle-prod-modal.component.js';
import FeatureRow from './feature-row/feature-row.component.js'
import styles from './toggle-table.styles.css'

export default function ToggleTable (props) {
  const { toggles, refetchToggles } = props
  const envList = getEnvList(toggles);
  const togglesByFeaure = groupTogglesByFeature(toggles, envList)
  return (
    <div className={`${styles.tableWrapper} cps-card-table cps-card cps-margin-top-32`}>
      <table>
        <thead>
          <tr>
            <td>
              Feature Name
            </td>
            {envList.map(env => <td key={env}>{env}</td>)}
          </tr>
        </thead>
        <tbody>
          {
            togglesByFeaure.map(groupOfToggles => {
              const featureName = groupOfToggles[0].toggle.feature;
              return (
                <FeatureRow
                  key={featureName}
                  featureName={featureName}
                  groupOfToggles={groupOfToggles}
                  refetchToggles={refetchToggles}
                />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
