import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from 'commonButton'
import Modal from 'common/modal/scroll-modal.component.js'
import DeleteModalMetrics from './delete-modal-metrics.component.js'
import { useMetricsForToggle } from '../metrics/metrics.hooks.js'

const useStyles = makeStyles(theme => ({
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default function DeleteFeatureModal (props) {
  const { close, featureName, performDelete } = props
  const [metrics, loading, refetch]= useMetricsForToggle(featureName)
  const c = useStyles()
  return (
    <Modal
      headerText={`Delete feature ${featureName}`}
      closeAction={close}
    >
      <Modal.Body>
        <div>
          This is a hard delete. No takebacks. You should verify that the feature toggle is not referenced in code anymore before
          doing this. If it is referenced in code after this is deleted, the toggle meister will return a value of "OFF" for this
          feature toggle after the delete occurs.
        </div>
        <br />
        <DeleteModalMetrics
          metrics={metrics}
          loading={loading}
        />
      </Modal.Body>
      <Modal.BottomRow>
        <div className={c.buttonRow}>
          <Button color="primary" onClick={performDelete} disabled={loading} showLoader={loading} >
            Delete feature toggle
          </Button>
          <Button variant="text" onClick={close}>
            Nevermind
          </Button>
        </div>
      </Modal.BottomRow>
    </Modal>
  )
}
