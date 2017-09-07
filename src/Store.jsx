/* eslint no-underscore-dangle: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import callApiMiddleware from './callAPIMiddleware'
import reducers from './reducers'
import {saveToken} from './actions/auth'

import generateUUID from './helpers/generateUUID'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(callApiMiddleware)),
)

// Generate a unique token for accessing personal data on the server.
let token = localStorage.token
if (!token) {
  token = generateUUID()
  localStorage.token = token
}
store.dispatch(saveToken({token}))

const Store = ({children}) => <Provider store={store}>{children}</Provider>

Store.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Store
