export const getCategories = () => ({
  types: [
    'GET_CATEGORIES_REQUEST',
    'GET_CATEGORIES_SUCCESS',
    'GET_CATEGORIES_FAILURE',
  ],
  config: {
    url: '/categories',
  },
  shouldCallAPI: state =>
    state.categories.status === 'not fetched' ||
    state.categories.status === 'rejected',
})

export default getCategories
