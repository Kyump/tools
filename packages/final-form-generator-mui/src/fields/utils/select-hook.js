// @flow
// eslint-disable-next-line
import React, {useEffect, useRef, useState} from 'react';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import type {VariantType} from '../../types';

import type {OptionsPropsType} from './select-utils';

type RenderOptionType = (props: OptionsPropsType) => React$Node;

type UseSelectPropsType = {
	variant: VariantType,
	native?: boolean,
	renderNativeOption: RenderOptionType,
	renderMuiOption: RenderOptionType,
};

export const useSelect = ({
	variant,
	native,
	renderNativeOption,
	renderMuiOption,
}: UseSelectPropsType) => {
	const inputLabel = useRef<*>(null);
	const [labelWidth, setLabelWidth] = useState(0);
	const [InputComponent, setInputComponent] = useState(Input);
	const [renderOption, setRenderOption] = useState(() => renderMuiOption);
	useEffect(() => {
		setLabelWidth(inputLabel.current ? inputLabel.current.offsetWidth : 0);
		if (variant === 'outlined') {
			setInputComponent(OutlinedInput);
		} else if (variant === 'filled') {
			setInputComponent(FilledInput);
		}
		if (native) {
			setRenderOption(() => renderNativeOption);
		}
	}, []);
	return {inputLabel, labelWidth, InputComponent, renderOption};
};
