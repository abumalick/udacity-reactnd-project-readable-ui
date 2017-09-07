// @flow

export const getPosts = callback => ({
  types: ['GET_POSTS_REQUEST', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
  config: {
    url: '/posts',
  },
  shouldCallAPI: state =>
    state.posts.status === 'not fetched' ||
    state.posts.status === 'rejected' ||
    (state.posts.status === 'fetched' && state.posts.category),
  // If fetched for a specific category, we fetch anyway
  callback,
})

export default getPosts

export const getPostsFromCategory = (category, callback) => ({
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
  callback,
})

export const getPost = (id: number) => ({
  types: ['GET_POST_REQUEST', 'GET_POST_SUCCESS', 'GET_POST_FAILURE'],
  config: {
    url: `/posts/${id}`,
  },
  payload: {id},
  shouldCallAPI: state =>
    !state.posts.data[id] || state.posts.data[id].status === 'rejected',
})

export const newPost = ({
  callback,
  ...data
}: {
  id: string,
  author: string,
  body: string,
  category: string,
  timestamp: number,
  title: string,
  callback: Function,
}) => ({
  types: ['NEW_POST_REQUEST', 'NEW_POST_SUCCESS', 'NEW_POST_FAILURE'],
  config: {
    url: `/posts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  },
  callback,
  payload: {id: data.id},
})
export const editPost = ({
  callback,
  ...data
}: {
  id: string,
  author: string,
  body: string,
  category: string,
  timestamp: number,
  title: string,
  callback: Function,
}) => ({
  types: ['EDIT_POST_REQUEST', 'EDIT_POST_SUCCESS', 'EDIT_POST_FAILURE'],
  config: {
    url: `/posts/${data.id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  },
  callback,
  payload: {id: data.id},
})

export const deletePost = (id: number) => ({
  types: ['DELETE_POST_REQUEST', 'DELETE_POST_SUCCESS', 'DELETE_POST_FAILURE'],
  config: {
    method: 'DELETE',
    url: `/posts/${id}`,
  },
  payload: {id},
})

export const votePost = ({id, option}) => ({
  types: ['VOTE_POST_REQUEST', 'VOTE_POST_SUCCESS', 'VOTE_POST_FAILURE'],
  config: {
    url: `/posts/${id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {option},
  },
  payload: {id},
})
