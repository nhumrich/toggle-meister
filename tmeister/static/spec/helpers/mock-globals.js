mockGlobals([
	'src/**/*.js',
	'jspm_packages/**/multi-selector.js',
], {
	window: {
		localStorage: {
			getItem() {},
		}
	},
	document: {
		getElementById() {}
	},
});

global.TESTING_MODE = true;
