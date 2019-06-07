// @flow
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

type PropsType = {
	classes: Object,
	onChange: (event: SyntheticInputEvent<Radio>) => void,
	value: string,
};

const FormSelector = ({classes, onChange, value}: PropsType) => (
	<FormControl component="fieldset" className={classes.formControl}>
		<FormLabel component="legend">Form Type</FormLabel>
		<RadioGroup
			name="form-type"
			className={classes.group}
			value={value}
			onChange={onChange}
			row
		>
			<FormControlLabel
				value="SIMPLE"
				control={<Radio color="primary" />}
				label="Simple"
				labelPlacement="end"
			/>
			<FormControlLabel
				value="CUSTOM"
				control={<Radio color="primary" />}
				label="Custom"
				labelPlacement="end"
			/>
		</RadioGroup>
	</FormControl>
);

export default FormSelector;
