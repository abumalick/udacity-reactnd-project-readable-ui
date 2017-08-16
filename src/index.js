/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'tachyons'
import './index.css'
import Router from './Router'
import registerServiceWorker from './registerServiceWorker'
import Store from './Store'

ReactDOM.render(
  <Store>
    <Router />
  </Store>,
  document.getElementById('root'),
)
registerServiceWorker()
