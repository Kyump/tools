const {concurrent} = require('nps-utils');

module.exports = {
	scripts: {
		test: {
			description: 'check the size of the bundle',
			script: 'echo "No test yest"',
		},
		lint: {
			description: 'lint the entire project',
			script: 'eslint .',
		},
		flow: {
			description: 'flow check the entire project',
			script: 'flow check',
		},
		validate: {
			description:
				'This runs several scripts to make sure things look good before committing or on clean install',
			default: concurrent.nps('lint', 'flow', 'test'),
		},
		build: {
			decription: 'This will build all the libs of the project.',
			script: 'lerna exec --parallel -- npm run build',
		},
		watchFinalFormGenerator: {
			description: 'This watch and rebuild Final Form Generator bundles.',
			script: 'lerna exec --parallel -- npm run watch',
		},
		startFinalFormMuiExample: {
			description: 'Start Final Form Generator MUI Example',
			script:
				'webpack-dev-server --config packages/final-form-generator-mui-example/webpack.dev.config.js --hot',
		},
		startDevFinalFormGenerator: {
			description: 'This runs several scripts to dev Final Form Generator libs',
			default: concurrent.nps(
				'watchFinalFormGenerator',
				'startFinalFormMuiExample',
			),
		},
	},
	options: {
		silent: false,
	},
};
