import React from 'react';
import { getEnvList, groupTogglesByFeature, fuzzySearch } from './toggle-table.helpers.js';

export default function({toggles, searchValue, actions}) {
	const searchedToggles = fuzzySearch(toggles, searchValue);
	const envList = getEnvList(searchedToggles);

	return (
		<div className="cps-card-table cps-card cps-margin-top-32">
			<table>
				<thead>
					<tr>
						<td>
							Feature Name
						</td>
						{envList.map(env => <td key={env}>{env}</td>)}
					</tr>
				</thead>
				<tbody>
					{
						groupTogglesByFeature(searchedToggles, envList)
						.map(groupOfToggles => {
							const featureName = groupOfToggles[0].toggle.feature;

							return (
								<tr key={featureName} className="+hover">
									<td>
										{featureName}
									</td>
									{
										groupOfToggles
										.map(toggle => {
											return (
												<td key={toggle.toggle.env}>
													<label className="cps-toggle">
														<input
															type="checkbox"
															checked={toggle.toggle.state === 'ON'}
															onChange={e => {
																e.target.checked
																	?
																		actions.turnFeatureOn(toggle)
																	:
																		actions.turnFeatureOff(toggle)
															}}
														/>
														<span />
													</label>
												</td>
											);
										})
									}
								</tr>
							);
						})
					}
				</tbody>
			</table>
		</div>
	);
}
