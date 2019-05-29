import React, { useState } from 'react';
import SimpleButton from '../../common/simple-button/simple-button.component.js'
import Modal from '../../common/modal/modal.component.js'

export default function ToggleProdModal (props) {
  const { toggle, performChange, close, toggleWillBeOn } = props
  const [ days, setDays ] = useState(3)
  const [ rolling, setRolling ] = useState(false)
  return (
    <div className="cps-modal">
      <div className="cps-modal__screen"></div>
      <div className="cps-modal__dialog cps-card">
        <div className="cps-card__header cps-subheader-sm">
          <span>
            Alter Production feature toggle
          </span>
          <a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={close} />
        </div>
        <div className="cps-card__body">
          <div>
            This really will have an immediate impact on the production environment and could potentially break things for customers.
          </div>
          {
            toggleWillBeOn && false /*toggled off */ && (
              <div className='cps-margin-top-16'>
                <div className='cps-form-group'>
                  <label htmlFor="is-rolling-deploy">
                    <input
                      id='is-rolling-deploy'
                      className='cps-checkbox'
                      type='checkbox'
                      checked={rolling}
                      onChange={(e) => setRolling(e.target.checked)}
                    />
                    <span className='cps-margin-left-8'>
                      Rolling deployment?
                    </span>
                  </label>
                </div>
                {
                  rolling && (
                    <div className='cps-form-group'>
                      <label htmlFor="days-for-full-deployment">
                        Days until 100% deployed
                      </label>
                      <input
                        id={'days-for-full-deployment'}
                        className='cps-form-control'
                        type='number'
                        min={1}
                        max={50}
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </div>
                  )
                }
              </div>
            )
          }
          {
            toggleWillBeOn ? (
              <div>
                Are you sure you want to <strong>turn '{toggle.feature}' {toggleWillBeOn ? 'on' : 'off'} { rolling ? 'with' : 'without'}</strong> a rolling deploy?
              </div>
            ) : (
              <div>
                Are you sure you want to <strong>turn '{toggle.feature}' {toggleWillBeOn ? 'on' : 'off'}</strong> for ALL users?
              </div>
            )
          }
        </div>
        <div className="cps-modal__dialog__actions">
          <SimpleButton
            actionType="primary"
            onClick={() => {
              if (rolling) {
                performChange(`ROLL:${days}`)
              } else {
                performChange()
              }
            }}
            disableOnClick={true}
          >
            I know what I am doing
          </SimpleButton>
          <SimpleButton actionType="flat" onClick={close}>
            Nevermind
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}
  // export default class ToggleProdModal extends React.PureComponent {
  //   render() {
  //     return (
  //       <Modal
  //         headerText='Alter Production feature toggle'
  //         closeAction={this.props.close}
  //       >
  //         <div>
  //           <div>
  //             Are you sure you want to <strong>turn '{this.props.toggle.toggle.feature}' {this.props.toggleWillBeOn ? 'on' : 'off'}</strong>?
  //             This really will have an immediate impact on the production environment and could potentially break things for customers.
  //           </div>
  //           <div>
  //             <SimpleButton actionType="primary" onClick={this.props.performChange} disableOnClick={true}>
  //               I know what I am doing
  //             </SimpleButton>
  //             <SimpleButton actionType="flat" onClick={this.props.close}>
  //               Nevermind
  //             </SimpleButton>
  //           </div>
  //         </div>
  //       </Modal>
  //     );
  //   }
