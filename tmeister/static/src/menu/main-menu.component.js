import React from 'react';
import styles from './main-menu.styles.css';
import CprTooltip from 'cpr-tooltip';

export default function MainMenu(props) {
	return (
		<div className={`${styles.menu}`}>
			<CprTooltip text="Manage toggles">
				<a className={`${styles.menuItem} ${activeIcon("toggles")}`} title="Manage toggles" href="/#/toggles">
					<img src='/resources/toggle-icon.png' className={`${styles.icon}`} />
				</a>
			</CprTooltip>
			<CprTooltip text="Audit trail">
				<a className={`${styles.menuItem} ${activeIcon("audit-trail")}`} href="/#/audit-trail">
					<img src='/resources/audit-icon.png' className={`${styles.icon}`} />
				</a>
			</CprTooltip>
		</div>
	);
}

function activeIcon(urlFragment) {
	return window.location.hash.indexOf(urlFragment) >= 0 ? styles.active : '';
}
