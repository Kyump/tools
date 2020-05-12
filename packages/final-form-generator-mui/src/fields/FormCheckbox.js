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

const FormCheckbox = ({label, type, disabled, style, ...props}: PropsType) => (
	<Field {...props} type="checkbox">
		{({input: {name, onChange, checked, ...restInput}, ...rest}) => (
			<FormControlLabel
				control={
					<Checkbox
						{...rest}
						name={name}
						color="primary"
						onChange={onChange}
						inputProps={restInput}
						checked={checked}
						disabled={disabled}
					/>
				}
				label={label}
				style={style}
			/>
		)}
	</Field>
);

export default FormCheckbox;
