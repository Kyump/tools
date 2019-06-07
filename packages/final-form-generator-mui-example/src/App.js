// @flow
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import FormExample from './components/FormExample';
import ColumnSelector from './components/ColumnSelector';
import FormSelector from './components/FormSelector';
import CustomFormExample from './components/CustomFormExample';

const useStyles = makeStyles(theme => ({
	container: {
		background: theme.palette.primary.main,
		height: '100%',
		width: '100%',
	},
	root: {
		background: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		overflow: 'auto',
	},
	formControl: {
		margin: theme.spacing(3),
	},
	group: {
		margin: theme.spacing(1, 0),
		flexDirection: 'row',
	},
}));

const getForm = (form, columns) => {
	switch (form) {
		case 'CUSTOM':
			return <CustomFormExample columns={Number(columns)} />;
		default:
			return <FormExample columns={Number(columns)} />;
	}
};

function App() {
	const classes = useStyles();
	const [columns, setColumns] = useState('2');

	function handleColumnChange(event) {
		setColumns(event.target.value);
	}

	const [form, setForm] = useState('SIMPLE');

	function handleFormChange(event) {
		setForm(event.target.value);
	}

	return (
		<div className={classes.container}>
			<CssBaseline />
			<Container maxWidth="md" className={classes.root}>
				<Typography variant="h4" color="primary" align="center">
					Final Form Generator MUI Example
				</Typography>
				<Box>
					<ColumnSelector
						classes={classes}
						onChange={handleColumnChange}
						value={columns}
					/>
					<FormSelector
						classes={classes}
						onChange={handleFormChange}
						value={form}
					/>
				</Box>
				{getForm(form, columns)}
			</Container>
		</div>
	);
}

export default App;
