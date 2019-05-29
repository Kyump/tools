import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';
import App from './App';

ReactDOM.render(
	<ThemeProvider theme={createMuiTheme()}>
		<App />
	</ThemeProvider>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept();
}
