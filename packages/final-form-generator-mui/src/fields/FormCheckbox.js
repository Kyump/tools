// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type PropsType = {
	label: string,
	name: string,
	value: string,
};

const FormCheckbox = ({label, ...props}: PropsType) => (
	<Field type="checkbox" {...props}>
		{({input: {checked, value, name, onChange, ...restInput}, ...rest}) => {
			console.log(value, checked);
			return (
				<FormControlLabel
					control={
						<Checkbox
							checked={checked}
							name={name}
							color="primary"
							onChange={event => onChange && onChange(event)}
							inputProps={restInput}
							{...rest}
						/>
					}
					label={label}
				/>
			);
		}}
	</Field>
);

export default FormCheckbox;
