import React from 'react';
import styles from './search-box.css';

export default function({search}) {
	return (
		<div>
			<div className="cps-form-group cps-has-feedback cps-has-feedback-left cps-margin-right-8">
				<i className="cps-icon cps-icon-search cps-form-control-feedback"/>
				<input
					className={`cps-form-control ${styles.input}`}
					placeholder="Search features"
					type="text"
					onChange={e => search(e.target.value)}
				/>
			</div>
		</div>
	);
}
