// @flow
import React, {type Node} from 'react';
import {Field} from 'react-final-form';

type PropsType = {
	name: string,
	predicate: (value: any) => boolean,
	children: Node,
};

export const equal = (expected: any) => (value: any) => value === expected;

const FormCondition = ({name, predicate, children}: PropsType) => (
	<Field name={name} subscription={{value: true}}>
		{({input: {value}}) => (predicate(value) ? children : null)}
	</Field>
);

export default FormCondition;
