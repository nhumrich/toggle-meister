import React from 'react'
import styles from './feature-row.styles.css'
import { useDeleteToggle } from '../../toggles.hooks.js'

export default function FeatureRow (props) {
  const { featureName, groupOfToggles, refetchToggles } = props
  const [ deleteFeatureByName, deleteInProgress ] = useDeleteToggle(refetchToggles)
  return (
    <tr className="+hover">
      <td className={styles.featureName}>
        <div>
          {featureName}
        </div>
        <div className={`cps-btn-icon ${styles.buttonIcon}`}>
          <a className="cps-link" onClick={() => {deleteFeatureByName(featureName)}} >
            <span className="cps-icon cps-icon-close" />
          </a>
        </div>
      </td>
      {
        groupOfToggles
          .map(toggle => {
            return (
              <td key={toggle.toggle.env}>
                <label className="cps-toggle">
                  <input
                    type="checkbox"
                    checked={toggle.toggle.state === 'ON'}
                    onChange={() => {}}
                  />
                  <span />
                </label>
              </td>
            );
          })
      }
    </tr>
  );
}
