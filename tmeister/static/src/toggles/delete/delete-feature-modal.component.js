import React from 'react';
import SimpleButton from '../../common/simple-button/simple-button.component.js'
import Modal from '../../common/modal/modal.component.js'
import DeleteModalMetrics from './delete-modal-metrics.component.js'
import { useMetricsForToggle } from '../metrics/metrics.hooks.js'
import useLocalStorageAsToggle from '../../common/use-localstorage-as-toggle.hook.js'

export default function DeleteFeatureModal (props) {
  const { close, featureName, performDelete } = props
  const metricsActive = useLocalStorageAsToggle('metrics')
  const [metrics, loading, refetch]= useMetricsForToggle(metricsActive ? featureName : undefined)
  return (
    <Modal>
      <div className="cps-modal">
        <div className="cps-modal__screen"></div>
        <div className="cps-modal__dialog cps-card">
          <div className="cps-card__header cps-subheader-sm">
            <span>
              Delete feature '{featureName}'
            </span>
            <a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={close} />
          </div>
          <div className="cps-card__body">
            <div>
              This is a hard delete. No takebacks. You should verify that the feature toggle is not referenced in code anymore before
              doing this. If it is referenced in code after this is deleted, the toggle meister will return a value of "OFF" for this
              feature toggle after the delete occurs.
            </div>
            {

              metricsActive && (
                <>
                <br />
                <DeleteModalMetrics
                  metrics={metrics}
                  loading={loading}
                />
                </>
              )
            }
          </div>
          <div className="cps-modal__dialog__actions">
            <SimpleButton actionType="primary" onClick={performDelete} disableOnClick={true}>
              Delete feature toggle
            </SimpleButton>
            <SimpleButton actionType="flat" onClick={close}>
              Nevermind
            </SimpleButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
