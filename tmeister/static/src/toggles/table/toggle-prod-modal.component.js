import React from 'react';
import {CprButton} from 'canopy-styleguide!sofe';

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
						<CprButton actionType="primary" onClick={this.props.performChange} disableOnClick={true}>
							I know what I am doing
						</CprButton>
						<CprButton actionType="flat" onClick={this.props.close}>
							Nevermind
						</CprButton>
					</div>
				</div>
			</div>
		);
	}
}
