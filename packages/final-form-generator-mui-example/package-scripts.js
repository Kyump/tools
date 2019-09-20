const {concurrent, rimraf} = require('nps-utils');

module.exports = {
	scripts: {
		clean: {
			default: rimraf('dist'),
			modules: rimraf('node_modules'),
			all: {
				script: concurrent.nps('clean', 'clean.modules'),
			},
		},
	},
	options: {
		silent: false,
	},
};
