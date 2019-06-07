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

const ColumnSelector = ({classes, onChange, value}: PropsType) => (
	<FormControl component="fieldset" className={classes.formControl}>
		<FormLabel component="legend">Column Number</FormLabel>
		<RadioGroup
			name="column-number"
			className={classes.group}
			value={value}
			onChange={onChange}
			row
		>
			<FormControlLabel
				value="1"
				control={<Radio color="primary" />}
				label="1 column"
				labelPlacement="end"
			/>
			<FormControlLabel
				value="2"
				control={<Radio color="primary" />}
				label="2 columns"
				labelPlacement="end"
			/>
			<FormControlLabel
				value="3"
				control={<Radio color="primary" />}
				label="3 columns"
				labelPlacement="end"
			/>
			<FormControlLabel
				value="4"
				control={<Radio color="primary" />}
				label="4 columns"
				labelPlacement="end"
			/>
		</RadioGroup>
	</FormControl>
);

export default ColumnSelector;
