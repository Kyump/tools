// @flow
import React from 'react';

type PropsType = {name: string, type: string, customField: string};

const FormCustom = ({name, type, customField}: PropsType) => (
	<pre>{`name: ${name} / type: ${type} / customField: ${customField}`}</pre>
);

export default FormCustom;
