import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './routes'

import { Provider } from 'react-redux'
import store from './redux/store'


import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green,
    background: grey
  },
  status: {
    danger: 'orange',
  },
});


render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <App />
        </Fragment>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
