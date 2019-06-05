// @flow
import React from 'react';
import * as Yup from 'yup';
import FinalFormGenerator from '@kyump/final-form-generator-mui';
import Paper from '@material-ui/core/Paper';

type PropsType = {columns: number};

const SMALL_FORM = [
	{
		type: 'text',
		name: 'text',
		label: 'text',
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
];

const fields = [
	...SMALL_FORM,
	{
		type: 'container',
		fields: SMALL_FORM,
		name: 'simple-container',
		label: 'Container',
		columns: 2,
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
	{
		type: 'container',
		name: 'condition-container',
		Component: Paper,
		fields: [
			{
				label: 'Select condition',
				type: 'radio-group',
				name: 'conditionRadio',
				validation: Yup.string().required(),
				row: true,
				options: [
					{
						label: 'Condition 1',
						value: 'CONDITION_1',
					},
					{
						label: 'Condition 2',
						value: 'CONDITION_2',
					},
				],
			},
			{
				name: 'conditionRadio',
				type: 'condition',
				predicate: conditionRadio => conditionRadio === 'CONDITION_1',
				fields: [
					{
						type: 'text',
						name: 'textCondition1',
						label: 'text for condition 1',
						validation: Yup.string().when('conditionRadio', {
							is: conditionRadio => conditionRadio === 'CONDITION_1',
							then: Yup.string().required(
								'Required cause conditionRadio === CONDITION_1',
							),
						}),
					},
				],
			},
			{
				name: 'conditionRadio',
				type: 'condition',
				predicate: conditionRadio => conditionRadio === 'CONDITION_2',
				fields: [
					{
						type: 'text',
						name: 'textCondition2',
						label: 'text for condition 2',
						validation: Yup.string().when('conditionRadio', {
							is: conditionRadio => conditionRadio === 'CONDITION_2',
							then: Yup.string().required(
								'Required cause conditionRadio === CONDITION_2',
							),
						}),
					},
				],
			},
		],
	},
];

const FormExample = ({columns}: PropsType) => (
	<FinalFormGenerator
		fields={fields}
		columns={columns}
		onSubmit={values => alert(values)}
		devMode
	/>
);

export default FormExample;
