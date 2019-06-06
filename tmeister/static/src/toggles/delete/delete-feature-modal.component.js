import React from 'react';
import Button from 'commonButton'
import Modal from 'common/modal/modal.component.js'
import DeleteModalMetrics from './delete-modal-metrics.component.js'
import { useMetricsForToggle } from '../metrics/metrics.hooks.js'

export default function DeleteFeatureModal (props) {
  const { close, featureName, performDelete } = props
  const [metrics, loading, refetch]= useMetricsForToggle(featureName)
  return (
    <Modal
      headerText={`Delete feature ${featureName}`}
      closeAction={close}
    >
      <div>
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
        <br />
        <div className="cps-modal__dialog__actions">
          <Button actionType="primary" onClick={performDelete} disableOnClick={true}>
            Delete feature toggle
          </Button>
          <Button actionType="flat" onClick={close}>
            Nevermind
          </Button>
        </div>
      </div>
    </Modal>
  )
}
