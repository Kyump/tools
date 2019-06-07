// @flow
import React from 'react';
import useFormGenerator from '@kyump/final-form-generator';

import {defaultValidation, renderInput} from './fields/utils';
import type {FieldType, MuiFormPropsType} from './types';
import FormComponent from './FormComponent';

const MuiForm = ({
	fields,
	onSubmit,
	initialValues = {},
	preValidate = () => ({}),
	renderSubmit,
	children,
	customValidationSchema,
	devMode = false,
	columns = 1,
	rows = 0,
}: MuiFormPropsType<FieldType>) => {
	const {dom, validate} = useFormGenerator({
		customValidationSchema,
		defaultValidation,
		fields,
		preValidate,
		renderInput,
	});
	return (
		<FormComponent
			columns={columns}
			devMode={devMode}
			dom={dom}
			initialValues={initialValues}
			onSubmit={onSubmit}
			renderSubmit={renderSubmit}
			rows={rows}
			validate={validate}
		>
			{children}
		</FormComponent>
	);
};

export default MuiForm;
