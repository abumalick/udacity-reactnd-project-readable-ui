const auth = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.token,
      }
    default:
      return state
  }
}

export default auth
