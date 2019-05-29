import React from 'react';
import { getEnvList, groupTogglesByFeature, fuzzySearch } from './toggle-table.helpers.js';
import DeleteFeatureModal from '../delete/delete-feature-modal.component.js';
import ToggleProdModal from './toggle-prod-modal.component.js';
import FeatureRow from './feature-row/feature-row.component.js'
<<<<<<< HEAD
import styles from './toggle-table.styles.css'
=======
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'
>>>>>>> Basic table

export default function ToggleTable (props) {
  const { toggles, refetchToggles } = props
  const envList = getEnvList(toggles);
  const togglesByFeature = groupTogglesByFeature(toggles, envList)
  return (
<<<<<<< HEAD
    <div className={`${styles.tableWrapper} cps-card-table cps-card cps-margin-top-32`}>
      <table>
        <thead>
          <tr>
            <td>
=======
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
>>>>>>> Basic table
              Feature Name
            </TableCell>
            {envList.map(env => <TableCell key={env}>{env}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            togglesByFeature.map(groupOfToggles => {
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
        </TableBody>
      </Table>
    </Paper>
  )
}
