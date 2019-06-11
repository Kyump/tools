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
	},
	options: {
		silent: false,
	},
};
