// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type PropsType = {
	label: string,
	name: string,
	type?: string,
	disabled?: boolean,
	style?: Object,
};

const FormRadio = ({label, type, disabled, ...props}: PropsType) => (
	<Field {...props} type="radio">
		{({
			input: {checked, value, name, onChange, ...restInput},
			meta: {initial},
			...rest
		}) => (
			<FormControlLabel
				control={
					<Radio
						{...rest}
						value={value}
						name={name}
						color="primary"
						onChange={event => onChange && onChange(event)}
						inputProps={restInput}
						checked={initial}
						disabled={disabled}
					/>
				}
				label={label}
			/>
		)}
	</Field>
);

export default FormRadio;
