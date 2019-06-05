// @flow
import React from 'react';
import {Field} from 'react-final-form';
import {makeStyles} from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import type {LabelPlacementTye, OptionType} from '../types';
import FormCheckbox from './FormCheckbox';

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
	labelPlacement?: LabelPlacementTye,
	row?: boolean,
};

const FormCheckboxGroup = ({
	label,
	labelPlacement,
	name,
	options,
	row,
	style,
}: PropsType) => {
	const classes = useStyles();
	return (
		<Field name={name}>
			{({meta}) => (
				<FormControl
					component="fieldset"
					className={classes.formControl}
					error={meta.error && meta.touched}
					style={style}
				>
					<FormLabel component="legend">{label}</FormLabel>
					<FormGroup className={classes.group} row={row}>
						{options.map(({label: optionLabel, value: optionValue}) => (
							<FormCheckbox
								key={`${name}-option-${optionValue}`}
								name={name}
								label={optionLabel}
								labelPlacement={labelPlacement}
								value={optionValue}
							/>
						))}
					</FormGroup>
					{meta.error && meta.touched && (
						<FormHelperText>{meta.error}</FormHelperText>
					)}
				</FormControl>
			)}
		</Field>
	);
};

export default FormCheckboxGroup;
