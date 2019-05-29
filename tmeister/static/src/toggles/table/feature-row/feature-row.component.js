import React, { useState } from 'react'
import styles from './feature-row.styles.css'
import DeleteFeatureModal from '../../delete/delete-feature-modal.component.js'
import { useDeleteFeature } from '../../toggles.hooks.js'
import IndividualToggle from './individual-toggle/individual-toggle.component.js'
import { TableRow, TableCell, IconButton, Icon } from '@material-ui/core'

export default function FeatureRow (props) {
  const { featureName, groupOfToggles, refetchToggles } = props
  const [ deleteConfirmModal, setDeleteConfirmModal ] = useState(false)
  const [ deleteFeatureByName, deleteInProgress ] = useDeleteFeature(refetchToggles)
  return (
    <TableRow className="+hover">
      <TableCell>
        <div className={styles.featureName}>
          <div>
            {featureName}
          </div>
          <IconButton onClick={() => setDeleteConfirmModal(true)}>
            <Icon fontSize='small'>
              delete
            </Icon>
          </IconButton>
        </div>
      </TableCell>
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
    </TableRow>
  );
}
