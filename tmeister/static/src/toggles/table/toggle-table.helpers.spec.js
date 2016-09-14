import { getEnvList, groupTogglesByFeature } from './toggle-table.helpers.js';

describe('toggle-table.helpers.js', () => {
	let toggles;
	let envList;

	beforeEach(() => {
		toggles = [
			{
				"toggle": {
					"env": "Production",
					"feature": "f1",
					"state": "OFF"
				},
			},
		];

		envList = 'Production';
	});

	describe('getEnvList function', () => {
		it('returns an array of unique strings', () => {
			toggles = [
				{
					"toggle": {
						"env": "Production",
						"feature": "f1",
						"state": "OFF"
					},
				},
				{
					toggle: {
						env: "Production",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Production",
						feature: "f3",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f4",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f5",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f6",
						state: "OFF",
					},
				},
			];

			expect(getEnvList(toggles)).toEqual(["Production", "Stage"]);
		});

		it('always puts production first in the list', () => {
			toggles = [
				{
					toggle: {
						env: "Stage",
						feature: "f4",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f5",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f6",
						state: "OFF",
					},
				},
				{
					"toggle": {
						"env": "Production",
						"feature": "f1",
						"state": "OFF"
					},
				},
				{
					toggle: {
						env: "Production",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Production",
						feature: "f3",
						state: "OFF",
					},
				},
			];

			expect(getEnvList(toggles)).toEqual(["Production", "Stage"]);
		});
	});

	describe('groupTogglesByFeature function', () => {
		it('returns an array of arrays, where each inner array is a list of toggles', () => {
			const expected = [toggles];
			const actual = groupTogglesByFeature(toggles, envList);

			expect(actual).toEqual(expected);
		});

		it(`returns the top-level array is sorted by env list`, () => {
			toggles = [
				{
					toggle: {
						env: "Production",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Integration",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Production",
						feature: "f1",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Stage",
						feature: "f1",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "Integration",
						feature: "f1",
						state: "OFF",
					},
				},
			];

			envList = ["Integration", "Stage", "Production"];

			const expected = [
				[toggles[1], toggles[2], toggles[0]],
				[toggles[5], toggles[4], toggles[3]],
			];
			const actual = groupTogglesByFeature(toggles, envList);

			expect(actual).toEqual(expected);
		});
	});
});
