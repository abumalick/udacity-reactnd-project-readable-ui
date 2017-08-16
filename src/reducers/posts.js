const post = (state = {status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
      return {
        ...state,
        category: action.category,
        status: 'fetching',
      }
    case 'GET_POST_SUCCESS':
      return {
        ...state,
        ...action.response.data,
        category: action.category,
        status: 'fetched',
      }
    case 'GET_POST_FAILURE':
      return {
        ...state,
        category: action.category,
        status: 'rejected',
      }
    default:
      return state
  }
}

const posts = (state = {data: [], status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
    case 'GET_POST_SUCCESS':
    case 'GET_POST_FAILURE':
      return {
        ...state,
        data: [...state.data, post(state[action.id], action)],
      }
    case 'GET_POSTS_REQUEST':
    case 'GET_POSTS_FROM_CATEGORY_REQUEST':
      return {
        ...state,
        category: action.category,
        status: 'fetching',
      }
    case 'GET_POSTS_SUCCESS':
    case 'GET_POSTS_FROM_CATEGORY_SUCCESS':
      return {
        ...state,
        category: action.category,
        data: action.response.data,
        status: 'fetched',
      }
    case 'GET_POSTS_FROM_CATEGORY_FAILURE':
      return {
        ...state,
        category: action.category,
        status: 'rejected',
      }
    default:
      return state
  }
}

export default posts
