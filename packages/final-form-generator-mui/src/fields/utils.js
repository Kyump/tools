// @flow
import React from 'react';
import * as Yup from 'yup';
import stringHash from 'string-hash';
import Button from '@material-ui/core/Button';

import type {FieldType, RenderSubmitParamsType} from '../types';

import FormCheckbox from './FormCheckbox';
import FormContainer from './FormContainer';
import FormTextField from './FormTextField';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';
import FormMultiSelect from './FormMultiSelect';
import FormRadioGroup from './FormRadioGroup';
import FormCheckboxGroup from './FormCheckboxGroup';
import FormFile from './FormFile';
import FormCondition from './FormCondition';
// import FormCondition from './FormCondition';
// import FormDateField from './FormDate';
// import FormGroup from './FormGroup';
// import FormRadio from './FormRadio';
// import FormSelect from './FormSelect';
// import FormTextField from './FormTextField';
// import FormUploadFile from './FormUploadFile';
// import FormDateSelectField from './FormDateSelectField';
// import FormTimeField from './FormDatetime';
// import type {FieldType} from './types';
// import FormTime from './FormTime';
// import FormPaper from './FormPaper';
// import FormMultiSelect from './FormMultiSelect';
// import FormDateTimeSelectField from './FormDateTimeSelectField';
// import FormCityField from './FormCityField';

export const defaultValidation = (type?: string) => {
	switch (type) {
		case 'container':
			return undefined;
		case 'date':
			return Yup.date().required();
		case 'email':
			return Yup.string()
				.email()
				.required();
		case 'file':
			return Yup.object().required();
		case 'multi-select':
			return Yup.array()
				.of(Yup.string())
				.required();
		default:
			return Yup.string()
				.trim()
				.required();
	}
};

export const renderInput = ({
	field,
	children = [],
}: {
	+field: FieldType,
	children?: Array<React$Node>,
}): React$Node => {
	// eslint-disable-line complexity
	const key = `${field.type}-${stringHash(field.label || field.name)}`;
	switch (field.type) {
		case 'radio':
			return <FormRadio key={key} {...field} />;
		case 'radio-group':
			return <FormRadioGroup key={key} {...field} />;
		case 'checkbox':
			return <FormCheckbox key={key} {...field} />;
		case 'checkbox-group':
			return <FormCheckboxGroup key={key} {...field} />;
		case 'select':
			return <FormSelect key={key} {...field} />;
		case 'multi-select':
			return <FormMultiSelect key={key} {...field} />;
		case 'file':
			return <FormFile key={key} {...field} />;
		// case 'group':
		// 	return (
		// 		<FormGroup key={key} {...field}>
		// 			{children}
		// 		</FormGroup>
		// 	);
		case 'condition':
			return (
				<FormCondition key={key} name={field.name} predicate={field.predicate}>
					{children}
				</FormCondition>
			);
		case 'container':
			return (
				<FormContainer key={key} {...field}>
					{children}
				</FormContainer>
			);
		// case 'date':
		// 	return <FormDateField key={key} {...field} />;
		// case 'datetime':
		// 	return <FormTimeField key={key} {...field} />;
		// case 'date-select':
		// 	return <FormDateSelectField key={key} {...field} />;
		// case 'date-time-select':
		// 	return <FormDateTimeSelectField key={key} {...field} />;
		// case 'time':
		// 	return <FormTime key={key} {...field} />;
		case 'text':
		case 'email':
		case 'number':
		case 'password':
			// $FlowFixMe TODO check this at the end
			return <FormTextField key={key} {...field} />;
		default:
			return <span key={key}>{`${field.type} not handled`}</span>;
	}
};

export const renderSimpleSubmit = (label: string) => ({
	invalid,
	submitting,
	pristine,
	classes,
}: RenderSubmitParamsType) => (
	<Button
		variant="outlined"
		className={classes.submit}
		type="submit"
		disabled={invalid || submitting || pristine}
	>
		{label}
	</Button>
);
