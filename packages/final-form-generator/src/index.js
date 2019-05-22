// @flow
// eslint-disable-next-line
import React, {useEffect} from 'react';

export const userFormGenerator = fields => {
	const bite = 'couilles';

	useEffect(() => {
		console.log('hook');
	}, [fields]);

	return [bite];
};
