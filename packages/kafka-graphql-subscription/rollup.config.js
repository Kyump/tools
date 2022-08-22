import {
	generateExternal,
	genrateOutput,
	generateConfig,
} from '../../global.rollup.config';

import pkg from './package.json';

const name = pkg.name.replace(/^@capcar\//, '');

export default generateConfig({
	name,
	output: Object.assign(genrateOutput(name), {}),
	external: generateExternal(pkg),
});
