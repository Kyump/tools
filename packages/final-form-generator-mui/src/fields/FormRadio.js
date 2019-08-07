// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {renderLabelTypography} from './utils/label-typography';

type PropsType = {
	label: string,
	name: string,
	type?: string,
	fontSizeLabel?: string,
	style?: Object,
};

const FormRadio = ({
	label,
	type,
	fontSizeLabel = '1em',
	...props
}: PropsType) => (
	<Field type="radio" {...props}>
		{({input: {checked, value, name, onChange, ...restInput}, ...rest}) => (
			<FormControlLabel
				control={
					<Radio
						value={value}
						name={name}
						color="primary"
						onChange={event => onChange && onChange(event)}
						inputProps={restInput}
						{...rest}
					/>
				}
				label={renderLabelTypography({optionLabel: label, fontSizeLabel})}
			/>
		)}
	</Field>
);

export default FormRadio;
