const order = (state = {asc: false, by: 'voteScore'}, action) => {
  switch (action.type) {
    case 'ORDER_BY':
      return {
        ...state,
        asc: true,
        by: action.field,
      }
    case 'SWITCH_ORDER':
      return {
        ...state,
        asc: !state.asc,
      }
    default:
      return state
  }
}

const orderList = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_ORDER':
    case 'ORDER_BY':
    case 'SWITCH_ORDER':
      return {
        ...state,
        [action.id]: order(state[action.id], action),
      }
    default:
      return state
  }
}

export default orderList
