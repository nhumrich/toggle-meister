import React from 'react';
import AuditTrail from './audit-trail.component.js';

export default function AuditTrailContainer() {
	return (
		<div style={{marginLeft: "56px", marginRight: '56px'}}>
			<h2>
				Audit trail
			</h2>
			<AuditTrail />
		</div>
	);
}
