// @flow
import React from 'react';
import {Field} from 'react-final-form';

import TextField from '@material-ui/core/TextField';

const parsers = {
	number: value => Number(value),
};

type PropsType = {
	type: string,
	label: string,
	name: string,
	variant?: string,
};

const FormTextField = ({
	label,
	variant = 'outlined',
	name,
	type,
	...rest
}: PropsType) => (
	<Field name={name} type={type} label={label} parse={parsers[type]} {...rest}>
		{({input: {onChange, value, ...restInput}, meta, ...renderPropsRest}) => (
			<TextField
				inputProps={restInput}
				error={meta.error && meta.touched}
				onChange={onChange}
				helperText={meta.touched ? meta.error : undefined}
				variant={variant}
				value={value}
				{...renderPropsRest}
			/>
		)}
	</Field>
);

export default FormTextField;
