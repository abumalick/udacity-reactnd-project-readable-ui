import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import VoteScore from './VoteScore'
import {
  deleteComment,
  getComments,
  toggleCommentForm,
  voteComment,
} from '../actions/comments'
import {initializeOrder, orderBy, switchOrder} from '../actions/order'

import CommentForm from './CommentForm'

import edit from '../icons/edit.svg'
import xMark from '../icons/x-mark.svg'

class Comments extends Component {
  componentWillMount() {
    const {dispatch} = this.props
    dispatch(initializeOrder({id: 'comments'}))
  }
  componentDidMount() {
    const {dispatch, postId} = this.props
    dispatch(getComments(postId))
  }
  delete = (id, parentId) => {
    this.props.dispatch(deleteComment({id, parentId}))
  }
  render() {
    const {
      comments,
      dispatch,
      formVisible,
      order,
      postId,
      selectedComment,
    } = this.props
    return (
      <div>
        {comments.status === 'fetched' &&
          (comments.data.length ? (
            <div>
              <div className="ph2 flex justify-between items-baseline bg-light-gray">
                <h3 className="mv2 mr2">{`${comments.data
                  .length} Comment${comments.data.length > 1 ? 's' : ''}`}</h3>
                <div className="flex">
                  order by:
                  {Object.entries({
                    body: 'content',
                    timestamp: 'date',
                    voteScore: 'score',
                  }).map(([field, label]) => (
                    <button
                      key={field}
                      className={`flex ml1 pointer ${order.by === field
                        ? 'b--orange'
                        : ''}`}
                      onClick={() => {
                        if (order.by === field) {
                          dispatch(switchOrder({id: 'comments', field}))
                        } else {
                          dispatch(orderBy({id: 'comments', field}))
                        }
                      }}
                    >
                      {label}
                      <div className="rotate-90">
                        {order.by === field && (order.asc ? '<' : '>')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <table>
                <tbody>
                  {comments.data.map(comment => (
                    <tr key={comment.id}>
                      <td className="ph3 bg-light-gray gray">
                        <VoteScore
                          className="ph3"
                          onIncrement={() => {
                            dispatch(
                              voteComment({
                                id: comment.id,
                                option: 'upVote',
                                parentId: postId,
                              }),
                            )
                          }}
                          onDecrement={() => {
                            dispatch(
                              voteComment({
                                id: comment.id,
                                option: 'downVote',
                                parentId: postId,
                              }),
                            )
                          }}
                          voteScore={comment.voteScore}
                        />
                      </td>
                      <td>
                        <span className="near-black">
                          {comment.body} -
                        </span>{' '}
                        <span className="orange">{comment.author}</span>{' '}
                        <span className="silver">
                          {new Date(comment.timestamp).toDateString()}
                        </span>
                        <a
                          className="ml2 pointer"
                          onClick={() => {
                            dispatch(toggleCommentForm({id: comment.id}))
                          }}
                          role="button"
                          tabIndex="0"
                        >
                          <img alt="edit" className="h1" src={edit} />
                        </a>
                        <a
                          className="ml2 pointer"
                          onClick={() => {
                            this.delete(comment.id, comment.parentId)
                          }}
                          role="button"
                          tabIndex="0"
                        >
                          <img alt="delete" className="h1" src={xMark} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>There is currently not comments in this category.</p>
          ))}
        <div className="pv1 bg-light-gray tc">
          <button
            className="pointer"
            onClick={() => {
              dispatch(toggleCommentForm())
            }}
          >
            add a comment
          </button>
        </div>
        {formVisible && (
          <CommentForm
            comment={
              selectedComment ? (
                comments.data.find(({id}) => id === selectedComment)
              ) : (
                {}
              )
            }
            postId={postId}
          />
        )}
      </div>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  formVisible: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  selectedComment: PropTypes.string, // eslint-disable-line
}

export default connect(({comments, order}, {postId}) => {
  const commentsOrder = order.comments || {}
  const commentsData =
    comments[postId] &&
    comments[postId].data
      .slice() // copy the array because sort is not pure
      .sort(
        (comment1, comment2) =>
          commentsOrder.asc
            ? comment2[commentsOrder.by] < comment1[commentsOrder.by]
            : comment2[commentsOrder.by] > comment1[commentsOrder.by],
      )
  return {
    comments: {
      data: commentsData || [],
      status: (comments[postId] && comments[postId].status) || 'not fetched',
    },
    formVisible: comments.formVisible,
    order: commentsOrder,
    selectedComment: comments.selectedComment,
  }
})(Comments)
