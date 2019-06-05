// @flow
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormExample from './FormExample';

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

function App() {
	const classes = useStyles();
	const [columns, setColumns] = useState('2');

	function handleChange(event) {
		setColumns(event.target.value);
	}

	return (
		<div className={classes.container}>
			<CssBaseline />
			<Container maxWidth="md" className={classes.root}>
				<Typography variant="h4" color="primary" align="center">
					Final Form Generator MUI Example
				</Typography>
				<FormControl component="fieldset" className={classes.formControl}>
					<RadioGroup
						name="Column Number"
						className={classes.group}
						value={columns}
						onChange={handleChange}
					>
						<FormControlLabel
							value="1"
							control={<Radio color="primary" />}
							label="1 column"
							labelPlacement="end"
						/>
						<FormControlLabel
							value="2"
							control={<Radio color="primary" />}
							label="2 columns"
							labelPlacement="end"
						/>
						<FormControlLabel
							value="3"
							control={<Radio color="primary" />}
							label="3 columns"
							labelPlacement="end"
						/>
						<FormControlLabel
							value="4"
							control={<Radio color="primary" />}
							label="4 columns"
							labelPlacement="end"
						/>
					</RadioGroup>
				</FormControl>
				<FormExample columns={Number(columns)} />
			</Container>
		</div>
	);
}

export default App;
