// @flow

import React from 'react';
import {Typography} from '@material-ui/core';

export const renderLabelTypography = ({
	optionLabel,
	fontSizeLabel,
}: {
	optionLabel: string,
	fontSizeLabel: string,
}) => <Typography style={{fontSize: fontSizeLabel}}>{optionLabel}</Typography>;
