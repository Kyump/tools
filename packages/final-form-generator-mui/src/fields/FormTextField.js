// @flow
import React from 'react';
import {Field} from 'react-final-form';
import TextField from '@material-ui/core/TextField';

import type {VariantType} from '../types';

const parsers = (type: string) => {
	switch (type) {
		case 'number':
			return value => Number(value);
		default:
			return value => value;
	}
};

type PropsType = {
	label: string,
	name: string,
	type:
		| 'text'
		| 'email'
		| 'number'
		| 'password'
		| 'datetime-local'
		| 'time'
		| 'date',
	style?: Object,
	variant?: VariantType,
};

const FormTextField = ({
	label,
	type,
	variant = 'outlined',
	name,
	style,
}: PropsType) => (
	<Field name={name} type={type} label={label} parse={parsers(type)}>
		{({input: {onChange, value, ...restInput}, meta, ...renderPropsRest}) => (
			<TextField
				inputProps={restInput}
				error={meta.error && meta.touched}
				onChange={onChange}
				helperText={meta.touched ? meta.error : undefined}
				variant={variant}
				value={value}
				style={style}
				InputLabelProps={{
					shrink: ['date', 'time', 'datetime-local'].includes(type),
				}}
				{...renderPropsRest}
			/>
		)}
	</Field>
);

export default FormTextField;
