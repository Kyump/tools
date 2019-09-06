// @flow
import React from 'react';
import {Field} from 'react-final-form';
import TextField from '@material-ui/core/TextField';

import type {VariantType} from '../types';

const parsers = (type: string) => {
	switch (type) {
		case 'number':
			return value => Number(value);
		case 'email':
			return value => value.trim().toLowerCase();
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
	disabled?: boolean,
	style?: Object,
	variant?: VariantType,
};

const FormTextField = ({
	label,
	type,
	variant = 'outlined',
	name,
	disabled,
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
				disabled={disabled}
				style={style}
				InputLabelProps={{
					shrink:
						['date', 'time', 'datetime-local'].includes(type) || undefined,
				}}
				{...renderPropsRest}
			/>
		)}
	</Field>
);

export default FormTextField;
