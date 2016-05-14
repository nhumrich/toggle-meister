import React from 'react';
import styles from './create-toggle-modal.css!'

export default function({actions, toggles}) {
	return (
		<div className="cps-modal">
			<div className="cps-modal__screen"></div>
			<div className="cps-modal__dialog cps-card">
				<div className="cps-card__header cps-subheader-sm">
					<span>
						Create a new feature toggle
					</span>
					<a
						className="cps-modal__dialog__close cps-icon cps-icon-close"
						onClick={actions.hideCreateToggleModal}
					/>
				</div>
				<div className="cps-card__body">
					<div className="cps-form-group">
						<label htmlFor="new_feature_name">
							Feature Toggle Name
						</label>
						<input
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
									actions.createFeature(e.target.value, toggles)
								}
							}}
						/>
					</div>
				</div>
				<div className="cps-modal__dialog__actions">
					<button
						className="cps-btn +primary"
						onClick={() => {
							actions.createFeature(document.getElementById('create-toggle-modal-input').value, toggles);
						}}
						>
						CREATE TOGGLE
					</button>
					<a className="cps-link" onClick={actions.hideCreateToggleModal}>
						NEVERMIND
					</a>
				</div>
			</div>
		</div>
	);
}
