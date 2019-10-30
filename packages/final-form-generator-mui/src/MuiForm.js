// @flow
import React from 'react';
import useFormGenerator from '@kyump/final-form-generator';

import CircularProgress from '@material-ui/core/CircularProgress';
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
	const {dom, validate, decorators, loading} = useFormGenerator({
		customValidationSchema,
		defaultValidation,
		fields,
		preValidate,
		renderInput,
	});

	return loading ? (
		<CircularProgress />
	) : (
		<FormComponent
			columns={columns}
			devMode={devMode}
			dom={dom}
			decorators={decorators}
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
