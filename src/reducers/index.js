import {combineReducers} from 'redux'

import auth from './auth'
import categories from './categories'
import comments from './comments'
import form from './form'
import posts from './posts'

const reducers = combineReducers({
  auth,
  categories,
  comments,
  form,
  posts,
})

export default reducers
