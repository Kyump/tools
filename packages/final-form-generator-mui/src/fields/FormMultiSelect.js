// @flow
import React from 'react';
import {Field} from 'react-final-form';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import type {OptionType, VariantType} from '../types';
import {renderMuiCheckedOption, renderNativeOption} from './utils/select-utils';
import {useSelect} from './utils/select-hook';

const extractValueLabelAndItems = (options, renderOption, values) => {
	return options.reduce(
		(acc, option) => {
			const {label, value} = option;
			acc.valueLabelMap[value] = label;
			acc.optionItems.push(
				renderOption({label, value, checked: values.indexOf(value) > -1}),
			);
			return acc;
		},
		{valueLabelMap: {}, optionItems: []},
	);
};

type PropsType = {
	label: string,
	name: string,
	options: OptionType[],
	native?: boolean,
	style?: Object,
	disabled?: boolean,
	variant?: VariantType,
};

const FormTextField = ({
	label,
	name,
	options,
	native,
	style,
	disabled,
	variant = 'outlined',
}: PropsType) => {
	const {renderOption} = useSelect({
		native,
		renderMuiOption: renderMuiCheckedOption,
		renderNativeOption,
	});
	return (
		<Field name={name} label={label}>
			{({input: {onChange, value, ...restInput}, meta, ...renderPropsRest}) => {
				const {valueLabelMap, optionItems} = extractValueLabelAndItems(
					options,
					renderOption,
					value,
				);
				const labelId = `${name}-label-placeholder`;
				return (
					<FormControl
						{...renderPropsRest}
						error={meta.error && meta.touched}
						variant={variant}
						style={style}
						disabled={disabled}
					>
						<InputLabel shrink={native} id={labelId}>
							{label}
						</InputLabel>
						<Select
							multiple
							native={native}
							value={value || []}
							onChange={onChange}
							labelId={labelId}
							label={label}
							inputProps={{...restInput, name}}
							renderValue={selected =>
								selected
									.map(selectedValue => valueLabelMap[selectedValue])
									.join(', ')
							}
						>
							{optionItems}
						</Select>
						{meta.error && meta.touched && (
							<FormHelperText>{meta.error}</FormHelperText>
						)}
					</FormControl>
				);
			}}
		</Field>
	);
};

export default FormTextField;
