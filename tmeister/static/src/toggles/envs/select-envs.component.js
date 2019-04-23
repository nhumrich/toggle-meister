import React from 'react';
// import Pillbox from 'cpr-multiselect';
// import "cpr-multiselect/src/multi-selector.css!vanilla";
import { getEnvList } from '../table/toggle-table.helpers.js';
import { getSelectedEnvs } from './select-envs.helpers.js';
import { chain, uniq, includes, partial } from 'lodash';

export default function({actions, toggles}) {
	const envList = getEnvList(toggles);
	const selectedEnvs = getSelectedEnvs(envList);

	const items = envList.map(toPillboxItem);
	const selectedItems = items.filter(item => includes(selectedEnvs, item.label));

	// for now we've removed the rendering of cprselect since there is an issue with jspm build and the newest versions.
	return null
}

function toPillboxItem(env) {
	return {
		label: env,
		value: env,
	};
}

function setSelectedEnvs(action, envItems) {
	const envs = chain(envItems)
		.map(item => item.label)
		.concat("production")
		.uniq()
		.value();

	window.localStorage.setItem(`selected-envs`, JSON.stringify(envs));
	action(envs);
}
