const form = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_FORM':
      return {
        ...action.data,
      }
    case 'CHANGE_FIELD':
      return {
        ...state,
        error: undefined,
        [action.key]: action.value,
      }
    case 'DESTROY_FORM':
      return {}
    case 'SAVE_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default form
