import {combineReducers} from 'redux'

import auth from './auth'
import categories from './categories'
import comments from './comments'
import order from './order'
import posts from './posts'

const reducers = combineReducers({
  auth,
  categories,
  comments,
  order,
  posts,
})

export default reducers
