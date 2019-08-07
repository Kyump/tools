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

import type {LabelPlacementType, OptionType} from '../types';
import {renderLabelTypography} from './utils/label-typography';

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
	labelPlacement?: LabelPlacementType,
	fontSizeLabel?: string,
	row?: boolean,
	style?: Object,
};

const FormRadioGroup = ({
	label,
	labelPlacement = 'end',
	row,
	style,
	fontSizeLabel = '1em',
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
					style={style}
				>
					<FormLabel component="legend">{label}</FormLabel>
					<RadioGroup
						{...restInput}
						aria-label={name}
						className={classes.group}
						name={name}
						onChange={onChange}
						row={row}
						value={value}
					>
						{options.map(({label: optionLabel, value: optionValue}) => (
							<FormControlLabel
								key={`${name}-radio-${optionValue}`}
								value={optionValue}
								control={<Radio color="primary" />}
								label={renderLabelTypography({optionLabel, fontSizeLabel})}
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
