/* eslint no-underscore-dangle: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import callApiMiddleware from './callAPIMiddleware'
import reducers from './reducers'

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
store.dispatch({token, type: 'SAVE_TOKEN'})

const Store = ({children}) => <Provider store={store}>{children}</Provider>

Store.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Store
