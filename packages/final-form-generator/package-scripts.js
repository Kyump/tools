const {concurrent, rimraf, series} = require('nps-utils');

module.exports = {
	scripts: {
		build: {
			description: 'delete the dist directory and run all builds',
			default: series(
				rimraf('dist'),
				concurrent.nps(
					'build.es',
					'build.cjs',
					'build.umd.main',
					'build.umd.min',
				),
			),
			es: {
				description: 'run the build with rollup (uses rollup.config.js)',
				script: 'rollup --config --environment FORMAT:es',
			},
			cjs: {
				description: 'run rollup build with CommonJS format',
				script: 'rollup --config --environment FORMAT:cjs',
			},
			umd: {
				min: {
					description: 'run the rollup build with sourcemaps',
					script: 'rollup --config --sourcemap --environment MINIFY,FORMAT:umd',
				},
				main: {
					description: 'builds the cjs and umd files',
					script: 'rollup --config --sourcemap --environment FORMAT:umd',
				},
			},
		},
		watch: {
			description: 'watch with rollup',
			script: 'rollup --config --watch --environment FORMAT:es',
		},
	},
	options: {
		silent: false,
	},
};
