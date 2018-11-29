import React from 'react';
import moment from 'moment';
import { generalToast } from '../common/simple-toast/simple-toast.js';

export default class AuditTrail extends React.Component {
	constructor() {
		super();
		this.state = {
			auditEvents: [],
		};
	}
	componentWillMount() {
		fetch('/api/auditlog', {credentials: 'same-origin'})
		.then(response => {
			if (response.ok) {
				response
				.json()
				.then(json => {
					this.setState({
						auditEvents: json,
					});
				})
				.catch(err => {
					generalToast(err)
				});
			} else {
				generalToast(`Could not retrieve audit events, server responded with '${response.status}'`);
			}
		})
		.catch(err => {
			generalToast(err);
		});
	}
	render() {
		return (
			<div className="cps-card-table cps-card">
				<table>
					<thead>
						<tr className="cps-card-table__thin">
							<th>Event</th>
							<th>User</th>
							<th>Date</th>
							<th>Details</th>
						</tr>
						<tr className="+thin">
							<th colSpan="4" />
						</tr>
					</thead>
					<tbody>
						{this.state.auditEvents.map((auditEvent, index) => {
							return (
								<tr key={index}>
									<td>
										{eventToString(auditEvent)}
									</td>
									<td>
										{auditEvent.user}
									</td>
									<td>
										{moment(auditEvent.date).calendar()}
									</td>
									<td>
										{
											JSON
											.stringify(auditEvent.event_data, null, 4)
											.split("\n")
											.map((line, index) => {
												return (
													<div key={index}>
														{line.replace(/ /g, "\u00a0")}
													</div>
												);
											})
										}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

function eventToString(auditEvent) {
	const eventNameMap = {
		"toggle.switch": "Turn feature "
	};
	let suffix = "";
	if (auditEvent.event === 'toggle.switch') {
		suffix = auditEvent.event_data.new_state.toLowerCase();
	}
	const string = eventNameMap[auditEvent.event] || auditEvent.event;
	return string + suffix;
}
