/* eslint no-underscore-dangle: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import callApiMiddleware from './callAPIMiddleware'

import categories from './reducers/categories'
import comments from './reducers/comments'
import order from './reducers/order'
import posts from './reducers/posts'

const reducers = combineReducers({categories, comments, order, posts})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(callApiMiddleware)),
)

const Store = ({children}) => <Provider store={store}>{children}</Provider>

Store.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Store
