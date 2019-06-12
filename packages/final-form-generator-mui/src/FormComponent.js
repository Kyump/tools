// @flow
import React from 'react';
import {type Decorator} from 'final-form';
import {Form as FinalForm} from 'react-final-form';
import {makeStyles} from '@material-ui/styles';

import {renderSimpleSubmit} from './fields/utils';
import type {RenderSubmitParamsType} from './types';

type StylePropsType = {
	columns: number,
	rows: number,
};

export type PropsType = {
	dom: React$Node[],
	validate: (values: Object) => Object,
	decorators: Decorator[],
	onSubmit: (values: Object) => any,
	initialValues?: Object,
	// i dont get it, thoses props are used in STYLE
	columns?: number, // eslint-disable-line react/no-unused-prop-types
	rows?: number, // eslint-disable-line react/no-unused-prop-types
	renderSubmit?: (params: RenderSubmitParamsType) => React$Element<*>,
	devMode?: boolean,
	children?: React$Element<any>,
};

export const useStyles = makeStyles(theme => ({
	inputContainer: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: ({columns}: StylePropsType) => '1fr '.repeat(columns),
		gridTemplateRows: ({rows}: StylePropsType) => '1fr '.repeat(rows),
		gridColumnGap: theme.spacing(1),
		gridRowGap: theme.spacing(1),
		'& > *': {
			width: 'auto',
		},
	},
	submit: {
		justifySelf: 'end',
		alignSelf: 'end',
		gridColumnEnd: ({columns}: PropsType) => (columns || 1) + 1,
	},
}));

const formatJson = data => JSON.stringify(data, null, 2);

const FormComponent = ({
	dom,
	validate,
	onSubmit,
	initialValues = {},
	decorators,
	renderSubmit = renderSimpleSubmit('Valider'),
	children,
	devMode = false,
	columns = 1,
	rows = 0,
}: PropsType) => {
	const classes = useStyles({columns, rows});
	return (
		<FinalForm
			validate={validate}
			onSubmit={onSubmit}
			decorators={decorators}
			initialValues={initialValues}
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

export default FormComponent;
