import React from 'react';
import styles from './create-env-modal.css!';

export default function({actions, toggles}) {
	return (
		<div className="cps-modal">
			<div className="cps-modal__screen"></div>
			<div className="cps-modal__dialog cps-card">
				<div className="cps-card__header cps-subheader-sm">
					<span>
						Create a new Environment
					</span>
					<a
						className="cps-modal__dialog__close cps-icon cps-icon-close"
						onClick={actions.hideCreateEnvModal}
					/>
				</div>
				<div className="cps-card__body">
					<div className="cps-form-group">
						<label htmlFor="new_feature_name">
							Environment Name
						</label>
						<input
							id="create-environment-name"
							type="text"
							className={`cps-form-control ${styles.input}`}
							ref={el => {
								if (el && document.activeElement !== el) {
									el.focus()
								}
							}}
							onKeyPress={e => {
								if (e.charCode === 13) {
									actions.createEnvironment(e.target.value, toggles)
								}
							}}
						/>
					</div>
				</div>
				<div className="cps-modal__dialog__actions">
					<button className="cps-btn +primary" onClick={e => {
						actions.createEnvironment(document.getElementById('create-environment-name').value, toggles)
					}}>
						CREATE ENVIRONMENT
					</button>
					<a className="cps-link" onClick={actions.hideCreateEnvModal}>
						NEVERMIND
					</a>
				</div>
			</div>
		</div>
	);
}
