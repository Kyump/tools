// @flow
import React from 'react';
import * as Yup from 'yup';
import FinalFormGenerator from '@kyump/final-form-generator-mui';

type PropsType = {columns: number};

const SMALL_FORM = [
	{
		type: 'text',
		name: 'bite',
		label: 'text',
	},
	{
		type: 'phone',
		name: 'phone',
		label: 'phone',
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
		type: 'checkbox',
		name: 'simpleCheckbox',
		label: 'Simple checkbox',
	},
	{
		label: 'Multiple checkbox',
		type: 'container',
		name: 'multipleCheckBox',
		validation: Yup.array(Yup.string()).required(),
		fields: [
			{
				label: 'Choice 1',
				name: 'multipleCheckBox',
				type: 'checkbox',
				value: 'CHOICE_1',
			},
			{
				label: 'Choice 2',
				name: 'multipleCheckBox',
				type: 'checkbox',
				value: 'CHOICE_2',
			},
			{
				type: 'container',
				fields: SMALL_FORM,
				name: 'simple-container',
				label: 'Container',
				columns: 2,
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
