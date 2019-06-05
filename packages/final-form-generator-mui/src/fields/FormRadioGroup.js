// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import {makeStyles} from '@material-ui/styles';

import type {LabelPlacementTye, OptionType} from '../types';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
	},
	group: {
		margin: theme.spacing(1, 0),
	},
}));

type PropsType = {
	label: string,
	name: string,
	options: OptionType[],
	style?: Object,
	labelPlacement: LabelPlacementTye,
};

const FormRadioGroup = ({
	label,
	labelPlacement = 'end',
	options,
	...props
}: PropsType) => {
	const classes = useStyles();
	return (
		<Field {...props}>
			{({
				input: {checked, value, name, onChange, ...restInput},
				meta,
				...rest
			}) => (
				<FormControl
					component="fieldset"
					className={classes.formControl}
					{...rest}
					error={meta.error && meta.touched}
				>
					<FormLabel component="legend">{label}</FormLabel>
					<RadioGroup
						aria-label={name}
						className={classes.group}
						name={name}
						value={value}
						onChange={onChange}
						{...restInput}
					>
						{options.map(({label: optionLabel, value: optionValue}) => (
							<FormControlLabel
								value={optionValue}
								control={<Radio color="primary" />}
								label={optionLabel}
								labelPlacement={labelPlacement}
							/>
						))}
					</RadioGroup>
					{meta.error && meta.touched && (
						<FormHelperText>{meta.error}</FormHelperText>
					)}
				</FormControl>
			)}
		</Field>
	);
};

export default FormRadioGroup;
