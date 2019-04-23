import { chain, uniq, intersection } from 'lodash';

export function getSelectedEnvs(allEnvs) {
	const localStorageValue = window.localStorage.getItem(`selected-envs`);
	const specificallySelectedEnvs = localStorageValue ? JSON.parse(localStorageValue) : [];
	const selectedEnvs = chain(specificallySelectedEnvs)
		.concat("integ", "stage", "production")
		.uniq()
		.value();

	return allEnvs ? intersection(selectedEnvs, allEnvs) : selectedEnvs;
}
