// source: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const callAPIMiddleware = ({dispatch, getState}) => next => action => {
  const {
    types, // array of 3 actions
    config, // a config for axios
    shouldCallAPI = () => true, // a function that take the state as param and return a boolean
    payload = {}, // values that will be spread in the action
    callback = () => true, // a function callback that take two params: true and response if successful, false and error if failed
  } = action

  if (!types) {
    // Normal action: pass it on
    return next(action)
  }

  // Does the action have the necessary data ?
  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.')
  }
  if (typeof config !== 'object' || !config.url) {
    throw new Error(
      'Expected config to be an object with at least url field set',
    )
  }

  // Should we call API ?
  if (!shouldCallAPI(getState())) {
    return false
  }

  // Prepare data
  const [requestType, successType, failureType] = types
  const url = `${API_URL}${config.url}`
  const token = getState().auth.token
  const finalConfig = {
    ...config,
    url,
    headers: {Authorization: token},
  }

  // All right, we start
  dispatch({
    type: requestType,
    ...payload,
  })

  return axios(finalConfig).then(
    response =>
      dispatch(
        {
          response,
          type: successType,
          ...payload,
        },
        callback(true, response),
      ),
    error =>
      dispatch(
        {
          error,
          type: failureType,
          ...payload,
        },
        callback(false, error),
      ),
  )
}

export default callAPIMiddleware
