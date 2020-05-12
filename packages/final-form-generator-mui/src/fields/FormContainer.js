// @flow
import React, {type Node} from 'react';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

type PropsType = {
	label?: string,
	children: Node,
	columns?: number,
	style?: Object,
};

type StyleProps = {|
	columns: number,
|};

export const useStyles = makeStyles({
	container: {
		display: 'grid',
		gridTemplateColumns: ({columns}: StyleProps) => '1fr '.repeat(columns),
		gridColumnGap: '8px',
		gridRowGap: '8px',
		padding: 8,
		'& > *': {
			width: 'auto',
		},
	},
	title: {
		gridRow: 1,
		gridColumn: ({columns}: StyleProps) => `1 / ${columns + 1}`,
	},
});

const FormContainer = ({
	children,
	label,
	columns = 1,
	style,
	// FlowFixMe flow doesn't tolerate his own type
	Component = 'div',
}: PropsType) => {
	const classes = useStyles({columns});
	return (
		<Component className={classes.container} style={style}>
			{label && (
				<Typography
					color="textSecondary"
					variant="subtitle1"
					className={classes.title}
					gutterBottom
				>
					{label}
				</Typography>
			)}
			{children}
		</Component>
	);
};

export default FormContainer;
