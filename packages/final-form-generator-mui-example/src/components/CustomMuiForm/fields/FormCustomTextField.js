// @flow
import React from 'react';
import {Field} from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/styles';

type PropsType = {
	label: string,
	name: string,
	style?: Object,
};

const useStyles = makeStyles({
	textField: {
		background: 'cyan',
		color: 'purple',
	},
});

const FormCustomTextField = ({label, name}: PropsType) => {
	const classes = useStyles();
	return (
		<Field name={name} type="text" label={label}>
			{({input: {onChange, value, ...restInput}, meta, ...renderPropsRest}) => (
				<TextField
					className={classes.textField}
					inputProps={restInput}
					error={meta.error && meta.touched}
					onChange={onChange}
					helperText={meta.touched ? meta.error : undefined}
					variant="filled"
					value={value}
					{...renderPropsRest}
				/>
			)}
		</Field>
	);
};

export default FormCustomTextField;
