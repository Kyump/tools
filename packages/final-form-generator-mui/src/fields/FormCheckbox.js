// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {renderLabelTypography} from './utils/label-typography';

type PropsType = {
	label: string,
	name: string,
	style?: Object,
	fontSizeLabel?: string,
	type?: string,
};

const FormCheckbox = ({
	label,
	type,
	fontSizeLabel = '1em',
	...props
}: PropsType) => (
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
				label={renderLabelTypography({optionLabel: label, fontSizeLabel})}
			/>
		)}
	</Field>
);

export default FormCheckbox;
