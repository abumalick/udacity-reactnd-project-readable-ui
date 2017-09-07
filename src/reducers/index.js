import {combineReducers} from 'redux'

import auth from './auth'
import categories from './categories'
import comments from './comments'
import form from './form'
import order from './order'
import posts from './posts'

const reducers = combineReducers({
  auth,
  categories,
  comments,
  form,
  order,
  posts,
})

export default reducers
