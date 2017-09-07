// @flow

export const deleteComment = ({
  id,
  parentId,
}: {
  id: string,
  parentId: string,
}) => ({
  types: [
    'DELETE_COMMENT_REQUEST',
    'DELETE_COMMENT_SUCCESS',
    'DELETE_COMMENT_FAILURE',
  ],
  config: {
    url: `/comments/${id}`,
    method: 'DELETE',
  },
  payload: {id, parentId},
})

export const editComment = ({
  id,
  author,
  body,
  timestamp,
  callback,
  parentId,
}: {
  id: string,
  body: string,
  timestamp: number,
  callback: Function,
  parentId: string,
}) => ({
  types: [
    'EDIT_COMMENT_REQUEST',
    'EDIT_COMMENT_SUCCESS',
    'EDIT_COMMENT_FAILURE',
  ],
  config: {
    url: `/comments/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {author, body, timestamp},
  },
  callback,
  payload: {id, parentId},
})

export const getComments = (parentId: number) => ({
  types: [
    'GET_COMMENTS_REQUEST',
    'GET_COMMENTS_SUCCESS',
    'GET_COMMENTS_FAILURE',
  ],
  config: {
    url: `/posts/${parentId}/comments`,
  },
  payload: {parentId},
  shouldCallAPI: state =>
    !state.comments[parentId] || state.comments[parentId].status === 'rejected',
})
export default getComments

export const newComment = ({
  callback,
  ...data
}: {
  id: string,
  author: string,
  body: string,
  timestamp: number,
  parentId: string,
  callback: Function,
}) => ({
  types: ['NEW_COMMENT_REQUEST', 'NEW_COMMENT_SUCCESS', 'NEW_COMMENT_FAILURE'],
  config: {
    url: `/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  },
  callback,
  payload: {parentId: data.parentId},
})

export const toggleCommentForm = ({id} = {}) => ({
  id,
  type: 'TOGGLE_COMMENT_FORM',
})

export const voteComment = ({id, option, parentId}) => ({
  types: [
    'VOTE_COMMENT_REQUEST',
    'VOTE_COMMENT_SUCCESS',
    'VOTE_COMMENT_FAILURE',
  ],
  config: {
    url: `/comments/${id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {option},
  },
  payload: {id, parentId},
})
