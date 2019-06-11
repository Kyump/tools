import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

const DEFAULT_INPUT = 'src/index.js';
const DEFAULT_OUTPUT = {
	file: 'dist/index.js',
	format: 'es',
};

const minify = process.env.MINIFY;
const format = process.env.FORMAT;
const umd = format === 'umd';
const cjs = format === 'cjs';

const makeExternalPredicate = externalArr => {
	if (externalArr.length === 0) {
		return () => false;
	}
	const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
	return id => pattern.test(id);
};

export const genrateOutput = (name = 'index') => ({
	name,
	file: `dist/${name}.${format}${minify ? '.min' : ''}.js`,
	format,
});

export const generateExternal = pkg =>
	makeExternalPredicate(
		umd
			? Object.keys(pkg.peerDependencies || {})
			: [
					...Object.keys(pkg.dependencies || {}),
					...Object.keys(pkg.peerDependencies || {}),
			  ],
	);

export function generateConfig(optional) {
	return {
		input: optional.input || DEFAULT_INPUT,
		output: optional.output || DEFAULT_OUTPUT,
		external: optional.external || [],
		plugins: [
			resolve({mainFields: ['jsnext:main']}),
			commonjs({
				include: 'node_modules/**',
			}),
			babel({
				rootMode: 'upward',
				exclude: 'node_modules/**',
				plugins: [['@babel/plugin-transform-runtime', {useESModules: !cjs}]],
				runtimeHelpers: true,
			}),
			minify ? terser() : null,
		].filter(Boolean),
	};
}
