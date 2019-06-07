// @flow
import React from 'react';
import stringHash from 'string-hash';
import type {MuiFormPropsType} from '@kyump/final-form-generator-mui/src/types';
import {
	FormComponent,
	useMuiFormGenerator,
} from '@kyump/final-form-generator-mui';

import type {CustomFieldType} from './types';
import FormCustom from './fields/FormCustom';
import FormCustomTextField from './fields/FormCustomTextField';

const CustomMuiForm = ({
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
}: MuiFormPropsType<CustomFieldType>) => {
	const {dom, validate} = useMuiFormGenerator({
		customValidationSchema,
		customDefaultValidation: name => {
			switch (name) {
				case 'custom':
				default:
					return undefined;
			}
		},
		fields,
		preValidate,
		customRenderInput: ({field}) => {
			// eslint-disable-line complexity
			const key = `${field.type}-${stringHash(field.label || field.name)}`;
			switch (field.type) {
				case 'custom':
					return <FormCustom key={key} {...field} />;
				case 'text':
					return <FormCustomTextField key={key} {...field} />;
				default:
					return undefined;
			}
		},
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

export default CustomMuiForm;
