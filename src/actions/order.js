export const initializeOrder = ({id}) => ({
  id,
  type: 'INITIALIZE_ORDER',
})

export const orderBy = ({id, field}) => ({
  field,
  id,
  type: 'ORDER_BY',
})

export default orderBy

export const switchOrder = ({id}) => ({
  id,
  type: 'SWITCH_ORDER',
})
