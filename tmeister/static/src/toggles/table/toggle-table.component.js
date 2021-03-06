import React from 'react';
import { groupTogglesByFeature } from './toggle-table.helpers.js';
import DeleteFeatureModal from '../delete/delete-feature-modal.component.js';
import ToggleProdModal from './toggle-prod-modal.component.js';
import FeatureRow from './feature-row/feature-row.component.js'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'

export default function ToggleTable (props) {
  const { toggles, refetchToggles, envs } = props
  const togglesByFeature = groupTogglesByFeature(toggles, envs)
  return (
    <Paper>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              Feature Name
            </TableCell>
            {envs.map(env => <TableCell key={env}>{env}</TableCell>)}
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
