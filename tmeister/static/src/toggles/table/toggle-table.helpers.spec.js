import { getEnvList, groupTogglesByFeature } from './toggle-table.helpers.js';

describe('toggle-table.helpers.js', () => {
	let toggles;
	let envList;

	beforeEach(() => {
		toggles = [
			{
				"toggle": {
					"env": "production",
					"feature": "f1",
					"state": "OFF"
				},
			},
		];

		envList = 'production';
	});

	describe('getEnvList function', () => {
		it('returns an array of unique strings', () => {
			toggles = [
				{
					"toggle": {
						"env": "production",
						"feature": "f1",
						"state": "OFF"
					},
				},
				{
					toggle: {
						env: "production",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "production",
						feature: "f3",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f4",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f5",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f6",
						state: "OFF",
					},
				},
			];

			expect(getEnvList(toggles)).toEqual(["production", "stage"]);
		});

		it('always puts production first in the list', () => {
			toggles = [
				{
					toggle: {
						env: "stage",
						feature: "f4",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f5",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f6",
						state: "OFF",
					},
				},
				{
					"toggle": {
						"env": "production",
						"feature": "f1",
						"state": "OFF"
					},
				},
				{
					toggle: {
						env: "production",
						feature: "f2",
						state: "OFF",
					},
				},
        {
          toggle: {
            env: "nonproduction",
            feature: "f7",
            state: "OFF",
          },
        },
				{
					toggle: {
						env: "production",
						feature: "f3",
						state: "OFF",
					},
				},
			];

			expect(getEnvList(toggles)).toEqual(["production", "stage", "nonproduction"]);
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
						env: "production",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "integ",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f2",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "production",
						feature: "f1",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "stage",
						feature: "f1",
						state: "OFF",
					},
				},
				{
					toggle: {
						env: "integ",
						feature: "f1",
						state: "OFF",
					},
				},
			];

			envList = ["integ", "stage", "production"];

			const expected = [
				[toggles[1], toggles[2], toggles[0]],
				[toggles[5], toggles[4], toggles[3]],
			];
			const actual = groupTogglesByFeature(toggles, envList);

			expect(actual).toEqual(expected);
		});
	});
});
