import React, { useState } from 'react'
import styles from './feature-row.styles.css'
import DeleteFeatureModal from '../../delete/delete-feature-modal.component.js'
import { useDeleteFeature } from '../../toggles.hooks.js'
import IndividualToggle from './individual-toggle/individual-toggle.component.js'

export default function FeatureRow (props) {
  const { featureName, groupOfToggles, refetchToggles } = props
  const [ deleteConfirmModal, setDeleteConfirmModal ] = useState(false)
  const [ deleteFeatureByName, deleteInProgress ] = useDeleteFeature(refetchToggles)
  return (
    <tr className={`+hover ${styles.row}`}>
      <td className={styles.featureName}>
        <div>
          {featureName}
        </div>
        <div className={`cps-btn-icon ${styles.buttonIcon}`}>
          <a className="cps-link" onClick={() => {setDeleteConfirmModal(true)}} >
            <span className="cps-icon cps-icon-close" />
          </a>
        </div>
      </td>
      {
        groupOfToggles
          .map(toggle => (
            <IndividualToggle
              refetchToggles={refetchToggles}
              key={toggle.toggle.env}
              toggle={toggle}
            />
          ))
      }
      {
        deleteConfirmModal && (
          <DeleteFeatureModal
            featureName={featureName}
            close={() => setDeleteConfirmModal(false)}
            performDelete={() => deleteFeatureByName(featureName)}
          />
        )
      }
    </tr>
  );
}
