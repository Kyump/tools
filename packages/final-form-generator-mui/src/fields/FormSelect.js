// @flow
import React from 'react';
import {Field} from 'react-final-form';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import type {OptionType, VariantType} from '../types';

import {renderMuiOption, renderNativeOption} from './utils/select-utils';
import {useSelect} from './utils/select-hook';

type PropsType = {
	label: string,
	name: string,
	options: OptionType[],
	native?: boolean,
	style?: Object,
	disabled?: boolean,
	variant?: VariantType,
};

const FormSelect = ({
	label,
	variant = 'outlined',
	options,
	name,
	disabled,
	native,
}: PropsType) => {
	const {inputLabel, InputComponent, renderOption} = useSelect({
		native,
		variant,
		renderMuiOption,
		renderNativeOption,
	});
	return (
		<Field name={name} label={label}>
			{({input: {onChange, value, ...restInput}, meta, ...renderPropsRest}) => (
				<FormControl
					error={meta.error && meta.touched}
					variant={variant}
					disabled={disabled}
					{...renderPropsRest}
				>
					<InputLabel ref={inputLabel} htmlFor={name}>
						{label}
					</InputLabel>
					<Select
						native={native}
						value={value}
						onChange={onChange}
						input={<InputComponent name={name} id={name} {...restInput} />}
					>
						{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
						{native ? <option value="" /> : <MenuItem value="" />}
						{options.map(renderOption)}
					</Select>
					{meta.error && meta.touched && (
						<FormHelperText>{meta.error}</FormHelperText>
					)}
				</FormControl>
			)}
		</Field>
	);
};

export default FormSelect;
