// @flow
import React from 'react';
import {Form as FinalForm} from 'react-final-form';
import setFieldData from 'final-form-set-field-data';
import {makeStyles} from '@material-ui/styles';
import useFormGenerator from '@kyump/final-form-generator';

import {
	defaultValidation,
	renderInput,
	renderSimpleSubmit,
} from './fields/utils';
import type {PropsType} from './types';

type StylePropsType = {
	columns: number,
	rows: number,
};
export const useStyles = makeStyles({
	inputContainer: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: ({columns}: StylePropsType) => '1fr '.repeat(columns),
		gridTemplateRows: ({rows}: StylePropsType) => '1fr '.repeat(rows),
		gridColumnGap: '8px',
		gridRowGap: '8px',
		'& > *': {
			width: 'auto',
		},
	},
	submit: {
		justifySelf: 'end',
		alignSelf: 'end',
		gridColumnEnd: ({columns}: PropsType) => (columns || 1) + 1,
	},
});

const formatJson = data => JSON.stringify(data, null, 2);

const FinalFormGenerator = ({
	fields,
	onSubmit,
	initialValues = {},
	preValidate = () => ({}),
	renderSubmit = renderSimpleSubmit('Valider'),
	children,
	customValidationSchema,
	devMode = false,
	columns = 1,
	rows = 0,
}: PropsType) => {
	const classes = useStyles({columns, rows});
	const {decorators, dom, validate} = useFormGenerator({
		customValidationSchema,
		defaultValidation,
		fields,
		preValidate,
		renderInput,
	});
	return (
		<FinalForm
			validate={validate}
			onSubmit={onSubmit}
			mutators={{setFieldData}}
			initialValues={initialValues}
			decorators={decorators}
			render={({
				handleSubmit,
				submitting,
				pristine,
				invalid,
				values,
				errors,
			}) => {
				return (
					<>
						<form onSubmit={handleSubmit} className={classes.inputContainer}>
							{dom}
							{renderSubmit({
								invalid,
								submitting,
								pristine,
								classes,
							})}
							{children}
						</form>
						{process.env.NODE_ENV === 'development' &&
							devMode && [
								<pre key="values-for-dev">{formatJson(values)}</pre>,
								<pre key="erros-for-dev">{formatJson(errors)}</pre>,
							]}
					</>
				);
			}}
		/>
	);
};

export default FinalFormGenerator;
