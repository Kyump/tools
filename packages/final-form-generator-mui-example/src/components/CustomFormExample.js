// @flow
import React from 'react';
import * as Yup from 'yup';
import CustomMuiForm from './CustomMuiForm';

type PropsType = {columns: number};

const fields = [
	{
		type: 'custom',
		name: 'custom',
		label: 'custom',
		customField: 'customFieldValue',
	},
	{
		type: 'text',
		name: 'text',
		label: 'overridden text field',
	},
	{
		type: 'email',
		name: 'email',
		label: 'email',
	},
	{
		type: 'number',
		name: 'number',
		label: 'number',
	},
	{
		type: 'password',
		name: 'password',
		label: 'password',
	},
	{
		type: 'checkbox',
		name: 'simpleCheckbox',
		label: 'Simple checkbox',
	},
	{
		label: 'Multiple checkbox',
		type: 'checkbox-group',
		name: 'multipleCheckBox',
		validation: Yup.array(Yup.string()).required(),
		options: [
			{
				label: 'Choice 1',
				value: 'CHOICE_1',
			},
			{
				label: 'Choice 2',
				value: 'CHOICE_2',
			},
		],
	},
	{
		type: 'radio',
		name: 'simpleRadio',
		label: 'Simple radio',
	},
	{
		label: 'Multiple radio',
		type: 'radio-group',
		name: 'multipleRadio',
		validation: Yup.string().required(),
		options: [
			{
				label: 'Choice 1',
				value: 'CHOICE_1',
			},
			{
				label: 'Choice 2',
				value: 'CHOICE_2',
			},
		],
	},
	{
		label: 'Select',
		type: 'select',
		name: 'simpleSelect',
		validation: Yup.string().required(),
		options: [
			{label: 'Choice 1', value: 'CHOICE_1'},
			{label: 'Choice 2', value: 'CHOICE_2'},
			{label: 'Choice 3', value: 'CHOICE_3'},
		],
	},
	{
		label: 'Multiple Select',
		type: 'multi-select',
		name: 'multiSelect',
		validation: Yup.array(Yup.string()).required(),
		options: [
			{label: 'Choice 1', value: 'CHOICE_1'},
			{label: 'Choice 2', value: 'CHOICE_2'},
			{label: 'Choice 3', value: 'CHOICE_3'},
		],
	},
	{
		label: 'File to upload',
		type: 'file',
		name: 'fileToUpload',
		withPreview: true,
	},
	{
		label: 'File to upload with preview',
		type: 'file',
		name: 'fileToUploadWithPreview',
		withPreview: true,
	},
	{
		label: 'Date',
		type: 'date',
		name: 'date',
	},
	{
		label: 'Time',
		type: 'time',
		name: 'time',
	},
	{
		label: 'datetime',
		type: 'datetime-local',
		name: 'datetime',
	},
];

const FormExample = ({columns}: PropsType) => (
	<CustomMuiForm
		fields={fields}
		columns={columns}
		onSubmit={values => alert(values)}
		devMode
	/>
);

export default FormExample;
