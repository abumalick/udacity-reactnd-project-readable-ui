// @flow

export const getPosts = () => ({
  types: ['GET_POSTS_REQUEST', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
  config: {
    url: '/posts',
  },
  shouldCallAPI: state =>
    state.posts.status === 'not fetched' ||
    state.posts.status === 'rejected' ||
    (state.posts.status === 'fetched' && state.posts.category),
  // If fetched for a specific category, we fetch anyway
})

export default getPosts

export const getPostsFromCategory = category => ({
  types: [
    'GET_POSTS_FROM_CATEGORY_REQUEST',
    'GET_POSTS_FROM_CATEGORY_SUCCESS',
    'GET_POSTS_FROM_CATEGORY_FAILURE',
  ],
  config: {
    url: `/${category}/posts`,
  },
  payload: {category},
  shouldCallAPI: state =>
    state.posts.status === 'not fetched' ||
    state.posts.status === 'rejected' ||
    ((state.posts.status === 'fetching' || state.posts.status === 'fetched') &&
      state.posts.category &&
      state.posts.category !== category), // if already fetched for all categories or for current category we dont fetch
})

export const getPost = (id: number) => ({
  types: ['GET_POST_REQUEST', 'GET_POST_SUCCESS', 'GET_POST_FAILURE'],
  config: {
    url: `/posts/${id}`,
  },
  payload: {id},
  shouldCallAPI: state => !state.posts.data.some(post => post.id === id),
})

export const deletePost = (id: number) => ({
  types: ['DELETE_POST_REQUEST', 'DELETE_POST_SUCCESS', 'DELETE_POST_FAILURE'],
  config: {
    method: 'DELETE',
    url: `/posts/${id}`,
  },
  payload: {id},
  shouldCallAPI: state => !state.posts.data.some(post => post.id === id),
})
