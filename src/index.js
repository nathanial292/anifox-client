import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './routes'

import { Provider } from 'react-redux'
import store from './redux/store'

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <App />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
