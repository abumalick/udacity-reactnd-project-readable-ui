/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
// TODO: only import style of used modules
import 'antd/dist/antd.css'
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
