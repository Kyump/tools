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

export const defaultValidation = (type?: string) => {
	switch (type) {
		case 'container':
			return undefined;
		case 'date':
			return Yup.date().required();
		case 'email':
			return Yup.string().email().required();
		case 'file':
			return Yup.mixed()
				.required()
				.test(
					'fileType',
					'Unsupported file format',
					value => !value || (!!value.name && !!value.type && value.size),
				);
		case 'multi-select':
			return Yup.array().of(Yup.string()).required();
		default:
			return Yup.string().trim().required();
	}
};

export const renderInput = ({
	field,
	children = [],
	index,
}: {
	+field: FieldType,
	children?: Array<React$Node>,
	index: number,
}): React$Node => {
	// eslint-disable-line complexity
	const key = `${field.type}-${stringHash(field.label || field.name)}-${index}`;
	switch (field.type) {
		case 'radio':
			return <FormRadio {...field} key={key} />;
		case 'radio-group':
			return <FormRadioGroup {...field} key={key} />;
		case 'checkbox':
			return <FormCheckbox {...field} key={key} />;
		case 'checkbox-group':
			return <FormCheckboxGroup {...field} key={key} />;
		case 'select':
			return <FormSelect key={key} {...field} />;
		case 'multi-select':
			return <FormMultiSelect {...field} key={key} />;
		case 'file':
			return <FormFile {...field} key={key} />;
		case 'condition':
			return (
				<FormCondition key={key} name={field.name} predicate={field.predicate}>
					{children}
				</FormCondition>
			);
		case 'container':
			return (
				<FormContainer {...field} key={key}>
					{children}
				</FormContainer>
			);
		case 'date':
		case 'datetime-local':
		case 'time':
		case 'text':
		case 'email':
		case 'number':
		case 'password':
			// $FlowFixMe TODO check this at the end
			return <FormTextField {...field} key={key} />;
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
