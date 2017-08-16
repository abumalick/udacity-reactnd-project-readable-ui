const categories = (state = {data: [], status: 'not fetched'}, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_REQUEST':
      return {
        ...state,
        status: 'fetching',
      }
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        data: action.response.data.categories,
        status: 'fetched',
      }
    case 'GET_CATEGORIES_FAILURE':
      return {
        ...state,
        status: 'rejected',
      }
    default:
      return state
  }
}

export default categories
