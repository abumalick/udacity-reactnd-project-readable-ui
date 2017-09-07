const commentsById = (state = {data: [], status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_REQUEST':
      return {
        ...state,
        status: 'fetching',
      }
    case 'GET_COMMENTS_SUCCESS':
      return {
        ...state,
        data: action.response.data,
        status: 'fetched',
      }
    case 'GET_COMMENTS_FAILURE':
      return {
        ...state,
        status: 'rejected',
      }
    case 'NEW_COMMENT_SUCCESS':
      return {
        ...state,
        data: [...state.data, action.response.data],
      }
    case 'EDIT_COMMENT_SUCCESS': {
      const index = state.data.findIndex(({id}) => id === action.id)
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          action.response.data,
          ...state.data.slice(index + 1),
        ],
      }
    }
    case 'DELETE_COMMENT_SUCCESS': {
      const index = state.data.findIndex(({id}) => id === action.id)
      return {
        ...state,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
      }
    }
    case 'VOTE_COMMENT_SUCCESS': {
      const index = state.data.findIndex(({id}) => id === action.id)
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          action.response.data,
          ...state.data.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}

const comments = (state = {formVisible: false}, action) => {
  switch (action.type) {
    case 'DELETE_COMMENT_SUCCESS':
    case 'EDIT_COMMENT_SUCCESS':
    case 'GET_COMMENTS_REQUEST':
    case 'GET_COMMENTS_SUCCESS':
    case 'GET_COMMENTS_FAILURE':
    case 'NEW_COMMENT_SUCCESS':
    case 'VOTE_COMMENT_SUCCESS':
      return {
        ...state,
        [action.parentId]: commentsById(state[action.parentId], action),
      }
    case 'TOGGLE_COMMENT_FORM':
      return {
        ...state,
        selectedComment: action.id,
        formVisible: !state.formVisible,
      }
    default:
      return state
  }
}

export default comments
