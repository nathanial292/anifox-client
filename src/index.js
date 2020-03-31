import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './routes'

import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <App />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
