const post = (state = {status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
      return {
        ...state,
        status: 'fetching',
      }
    case 'GET_POST_SUCCESS':
      return {
        ...state,
        ...action.response.data,
        status: 'fetched',
      }
    case 'GET_POST_FAILURE':
      return {
        ...state,
        status: 'rejected',
      }
    case 'NEW_POST_SUCCESS':
    case 'EDIT_POST_SUCCESS':
      return {
        ...state,
        ...action.response.data,
        status: 'fetched',
      }
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        deleted: true,
      }
    case 'VOTE_POST_SUCCESS':
      return {
        ...state,
        voteScore: action.response.data.voteScore,
      }
    default:
      return state
  }
}

const posts = (state = {data: {}, status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
    case 'GET_POST_SUCCESS':
    case 'GET_POST_FAILURE':
    case 'NEW_POST_SUCCESS':
    case 'EDIT_POST_SUCCESS':
    case 'DELETE_POST_SUCCESS':
    case 'VOTE_POST_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: post(state.data[action.id], action),
        },
      }
    case 'GET_POSTS_REQUEST':
    case 'GET_POSTS_FROM_CATEGORY_REQUEST':
      return {
        ...state,
        category: action.category,
        status: 'fetching',
      }
    case 'GET_POSTS_SUCCESS':
    case 'GET_POSTS_FROM_CATEGORY_SUCCESS': {
      return {
        ...state,
        category: action.category,
        data: {
          ...state.data,
          // We transform our array to object with id as key
          ...action.response.data.reduce(
            (obj, item) => ({...obj, [item.id]: item}),
            {},
          ),
        },
        status: 'fetched',
      }
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
