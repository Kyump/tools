// @flow
import useFormGenerator from '@capcar/final-form-generator';

import type {UseMuiFinalFormGeneratorPropsType} from './types';
import {defaultValidation, renderInput} from './fields/utils';

export const useMuiFormGenerator = <T>({
	customValidationSchema,
	customDefaultValidation,
	fields,
	preValidate,
	customRenderInput,
}: UseMuiFinalFormGeneratorPropsType<T>) =>
	useFormGenerator({
		customValidationSchema,
		defaultValidation: (name: string) =>
			customDefaultValidation(name) || defaultValidation(name),
		fields,
		preValidate,
		renderInput: params => customRenderInput(params) || renderInput(params),
	});
