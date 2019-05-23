import React from 'react';
import SimpleButton from '../../common/simple-button/simple-button.component.js'

export default class ToggleProdModal extends React.PureComponent {
  render() {
    return (
      <div className="cps-modal">
        <div className="cps-modal__screen"></div>
        <div className="cps-modal__dialog cps-card">
          <div className="cps-card__header cps-subheader-sm">
            <span>
              Alter Production feature toggle
            </span>
            <a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={this.props.close} />
          </div>
          <div className="cps-card__body">
            Are you sure you want to <strong>turn '{this.props.toggle.toggle.feature}' {this.props.toggleWillBeOn ? 'on' : 'off'}</strong>?
            This really will have an immediate impact on the production environment and could potentially break things for customers.
          </div>
          <div className="cps-modal__dialog__actions">
            <SimpleButton actionType="primary" onClick={this.props.performChange} disableOnClick={true}>
              I know what I am doing
            </SimpleButton>
            <SimpleButton actionType="flat" onClick={this.props.close}>
              Nevermind
            </SimpleButton>
          </div>
        </div>
      </div>
    );
  }
}
