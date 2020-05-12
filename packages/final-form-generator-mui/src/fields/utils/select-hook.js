// @flow
import {useEffect, useState} from 'react';
import type {OptionsPropsType} from './select-utils';

type RenderOptionType = (props: OptionsPropsType) => React$Node;

type UseSelectPropsType = {|
	native?: boolean,
	renderNativeOption: RenderOptionType,
	renderMuiOption: RenderOptionType,
|};

export const useSelect = ({
	native,
	renderNativeOption,
	renderMuiOption,
}: UseSelectPropsType) => {
	const [renderOption, setRenderOption] = useState(() => renderMuiOption);
	useEffect(() => {
		if (native) {
			setRenderOption(() => renderNativeOption);
		}
	}, []);
	return {renderOption};
};
