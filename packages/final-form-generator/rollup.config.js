import {
	generateExternal,
	genrateOutput,
	generateConfig,
} from '../../global.rollup.config';

import pkg from './package.json';

const name = pkg.name.replace(/^@kyump\//, '');

export default generateConfig({
	name,
	output: Object.assign(genrateOutput(name), {
		exports: 'named',
		globals: {
			react: 'React',
			'final-form': 'FinalForm',
			'final-form-calculate': 'FinalFormCalculate',
			'final-form-set-field-data': 'FinalFormSetFieldData',
			'react-final-form': 'ReactFinalForm',
			yup: 'Yup',
		},
	}),

	external: generateExternal(pkg),
});
