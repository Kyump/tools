// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type PropsType = {
	label: string,
	name: string,
	style?: Object,
	disabled?: boolean,
	type?: string,
};

const FormCheckbox = ({label, type, disabled, ...props}: PropsType) => (
	<Field type="checkbox" {...props}>
		{({input: {name, onChange, checked, ...restInput}, ...rest}) => (
			<FormControlLabel
				control={
					<Checkbox
						name={name}
						color="primary"
						onChange={onChange}
						inputProps={restInput}
						checked={checked}
						disabled={disabled}
						{...rest}
					/>
				}
				label={label}
			/>
		)}
	</Field>
);

export default FormCheckbox;
