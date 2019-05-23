import React from 'react';
import { getEnvList, groupTogglesByFeature, fuzzySearch } from './toggle-table.helpers.js';
import DeleteFeatureModal from '../delete/delete-feature-modal.component.js';
import ToggleProdModal from './toggle-prod-modal.component.js';
import { infoToast } from '../../common/simple-toast/simple-toast.js';
import FeatureRow from './feature-row/feature-row.component.js'

export default function ToggleTable (props) {
  const { toggles, refetchToggles } = props
  const envList = getEnvList(toggles);
  const togglesByFeaure = groupTogglesByFeature(toggles, envList)
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
            togglesByFeaure.map(groupOfToggles => {
              const featureName = groupOfToggles[0].toggle.feature;
              return (
                <FeatureRow
                  key={featureName}
                  featureName={featureName}
                  groupOfToggles={groupOfToggles}
                  refetchToggles={refetchToggles}
                />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

// export default class ToggleTable extends React.Component {
// 	state = {
// 		deleteFeature: {
// 			showModal: false,
// 			featureName: null,
// 		},
// 		toggleProd: {
// 			showModal: false,
// 			toggle: null,
// 			toggleWillBeOn: false,
// 		},
// 	}
// 	render() {
// 		const {toggles, searchValue, actions} = this.props;
// 		const searchedToggles = fuzzySearch(toggles, searchValue);
// 		const envList = getEnvList(searchedToggles);
//
// 		return (
// 			<div className="cps-card-table cps-card cps-margin-top-32">
// 				<table>
// 					<thead>
// 						<tr>
// 							<td>
// 								Feature Name
// 							</td>
// 							{envList.map(env => <td key={env}>{env}</td>)}
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{
// 							groupTogglesByFeature(searchedToggles, envList)
// 								.map(groupOfToggles => {
// 									const featureName = groupOfToggles[0].toggle.feature;
//
// 									return (
// 										<tr key={featureName} className="+hover">
// 											<td className={styles.featureName}>
// 												<div>
// 													{featureName}
// 												</div>
// 												<div className={`cps-btn-icon ${styles.buttonIcon}`}>
// 													<a className="cps-link" onClick={() => this.showRemoveModal(featureName)}>
// 														<span className="cps-icon cps-icon-close" />
// 													</a>
// 												</div>
// 											</td>
// 											{
// 												groupOfToggles
// 													.map(toggle => {
// 														return (
// 															<td key={toggle.toggle.env}>
// 																<label className="cps-toggle">
// 																	<input
// 																		type="checkbox"
// 																		checked={toggle.toggle.state === 'ON'}
// 																		onChange={evt => this.handleToggleClick(evt, toggle)}
// 																	/>
// 																	<span />
// 																</label>
// 															</td>
// 														);
// 													})
// 											}
// 										</tr>
// 									);
// 								})
// 						}
// 					</tbody>
// 				</table>
// 				{this.state.deleteFeature.showModal &&
// 					<DeleteFeatureModal
// 						featureName={this.state.deleteFeature.featureName}
// 						close={this.hideRemoveModal}
// 						performDelete={this.performDelete}
// 					/>
// 				}
// 				{this.state.toggleProd.showModal &&
// 					<ToggleProdModal
// 						toggle={this.state.toggleProd.toggle}
// 						toggleWillBeOn={this.state.toggleProd.toggleWillBeOn}
// 						close={this.closeToggleProdModal}
// 						performChange={this.toggleProdToggle}
// 					/>
// 				}
// 			</div>
// 		);
// 	}
// 	showRemoveModal = featureName => {
// 		this.setState({
// 			deleteFeature: {
// 				showModal: true,
// 				featureName,
// 			},
// 		});
// 	}
// 	hideRemoveModal = () => {
// 		this.setState({
// 			deleteFeature: {
// 				showModal: false,
// 				featureName: null,
// 			},
// 		});
// 	}
// 	performDelete = () => {
// 		this.props.actions.deleteFeature(this.state.deleteFeature.featureName, () => {
// 			infoToast(`Feature '${this.state.deleteFeature.featureName}' deleted`);
// 			this.hideRemoveModal();
// 		});
// 	}
// 	handleToggleClick = (evt, toggle) => {
// 		if (toggle.toggle.env === 'production') {
// 			this.setState({
// 				toggleProd: {
// 					showModal: true,
// 					toggle,
// 					toggleWillBeOn: evt.target.checked,
// 				}
// 			})
// 		} else {
// 			const action = evt.target.checked ? this.props.actions.turnFeatureOn : this.props.actions.turnFeatureOff;
// 			action(toggle);
// 		}
// 	}
// 	closeToggleProdModal = () => {
// 		this.setState({
// 			toggleProd: {
// 				showModal: false,
// 				toggle: null,
// 				toggleWillBeOn: false,
// 			},
// 		});
// 	}
// 	toggleProdToggle = () => {
// 		const action = this.state.toggleProd.toggleWillBeOn ? this.props.actions.turnFeatureOn : this.props.actions.turnFeatureOff;
// 		action(this.state.toggleProd.toggle);
//
// 		this.setState({
// 			toggleProd: {
// 				showModal: false,
// 				toggle: null,
// 				toggleWillBeOn: false,
// 			},
// 		});
// 	}
// }
