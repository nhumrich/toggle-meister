import React from 'react';
import {CprButton} from 'canopy-styleguide!sofe';

export default class DeleteFeatureModal extends React.Component {
	render() {
		return (
			<div className="cps-modal">
				<div className="cps-modal__screen"></div>
				<div className="cps-modal__dialog cps-card">
					<div className="cps-card__header cps-subheader-sm">
						<span>
							Delete feature '{this.props.featureName}'
						</span>
						<a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={this.props.close} />
					</div>
					<div className="cps-card__body">
						This is a hard delete. No takebacks. You should verify that the feature toggle is not referenced in code anymore before
						doing this. If it is referenced in code after this is deleted, the toggle meister will return a value of "OFF" for this
						feature toggle after the delete occurs.
					</div>
					<div className="cps-modal__dialog__actions">
						<CprButton actionType="primary" onClick={this.props.performDelete} disableOnClick={true}>
							Delete feature toggle
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
