// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type PropsType = {
	label: string,
	name: string,
	style?: Object,
	type?: string,
};

const FormCheckbox = ({label, type, ...props}: PropsType) => (
	<Field type="checkbox" {...props}>
		{({input: {name, onChange, ...restInput}, ...rest}) => (
			<FormControlLabel
				control={
					<Checkbox
						name={name}
						color="primary"
						onChange={onChange}
						inputProps={restInput}
						{...rest}
					/>
				}
				label={label}
			/>
		)}
	</Field>
);

export default FormCheckbox;
