import React, { useState } from 'react';
import styles from './create-toggle-modal.css'
import { useCreateToggle } from '../create-hooks.js'
import Modal from '../../../common/modal/modal.component.js'

export default function CreateToggleModal (props) {
  const { hide, refetchToggles } = props
  const [ newToggleName, setNewToggleName ] = useState('')
  const [ createName, setCreateName ] = useState('')
  const [ saving, saveCompleted ] = useCreateToggle(createName)
  if (saveCompleted) {
    refetchToggles()
    hide()
  }
  return (
    <Modal>
      <div className="cps-modal">
        <div className="cps-modal__screen"></div>
        <div className="cps-modal__dialog cps-card">
          <div className="cps-card__header cps-subheader-sm">
            <span>
              Create a new feature toggle
            </span>
            <a
              className="cps-modal__dialog__close cps-icon cps-icon-close"
              onClick={hide}
            />
          </div>
          <div className="cps-card__body">
            <div className="cps-form-group">
              <label htmlFor="create-toggle-modal-input">
                Feature Toggle Name
              </label>
              <input
                value={newToggleName}
                onChange={(e) => setNewToggleName(e.target.value)}
                type="text"
                id="create-toggle-modal-input"
                className={`${styles.input} cps-form-control`}
                ref={el => {
                  if (el && document.activeElement !== el) {
                    el.focus()
                  }
                }}
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    setCreateName(e.target.value)
                  }
                }}
              />
            </div>
          </div>
          <div className="cps-modal__dialog__actions">
            <button
              className="cps-btn +primary"
              disabled={saving}
              onClick={() => {
                setCreateName(newToggleName)
              }}
            >
              Create feature
            </button>
            <a className="cps-link" onClick={hide}>
              Nevermind
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
