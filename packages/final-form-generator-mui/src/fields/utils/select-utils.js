// @flow
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

export type OptionsPropsType = $ReadOnly<{
	label: string,
	value: any,
	checked?: ?boolean,
}>;

export const renderMuiOption = ({label, value, ...rest}: OptionsPropsType) => (
	<MenuItem {...rest} key={`option-${value}`} value={value}>
		{label}
	</MenuItem>
);

export const renderNativeOption = ({
	value,
	label,
	...rest
}: OptionsPropsType) => (
	<option {...rest} key={`option-${value}`} value={value}>
		{label}
	</option>
);

export const renderMuiCheckedOption = ({
	value,
	label,
	checked,
}: OptionsPropsType) => (
	<MenuItem key={`option-${value}`} value={value}>
		<Checkbox checked={checked} />
		<ListItemText primary={label} />
	</MenuItem>
);
