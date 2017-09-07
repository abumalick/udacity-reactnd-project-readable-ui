export const changeField = ({key, value}) => ({
  key,
  value,
  type: 'CHANGE_FIELD',
})

export const destroyForm = () => ({
  type: 'DESTROY_FORM',
})

export const initializeForm = data => ({
  data,
  type: 'INITIALIZE_FORM',
})

export const saveError = ({error}) => ({
  error,
  type: 'SAVE_ERROR',
})
