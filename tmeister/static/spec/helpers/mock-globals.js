mockGlobals([
	'src/**/*.js',
	'jspm_packages/**/multi-selector.js',
], {
	window: {
		localStorage: {
			getItem() {},
		}
	},
});

global.TESTING_MODE = true;
