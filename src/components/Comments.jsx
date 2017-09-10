import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import VoteScore from './VoteScore'
import {
  deleteComment,
  getComments,
  toggleCommentForm,
  voteComment,
} from '../actions/comments'

import CommentForm from './CommentForm'

import edit from '../icons/edit.svg'
import xMark from '../icons/x-mark.svg'

class Comments extends Component {
  componentDidMount() {
    const {dispatch, postId} = this.props
    dispatch(getComments(postId))
  }
  delete = (id, parentId) => {
    this.props.dispatch(deleteComment({id, parentId}))
  }
  render() {
    const {
      className,
      comments,
      dispatch,
      formVisible,
      postId,
      selectedComment,
    } = this.props
    const columns = [
      {
        title: 'Score',
        dataIndex: 'voteScoreDisplay',
        sorter: (a, b) => b.voteScore - a.voteScore,
      },
      {
        title: 'Body',
        dataIndex: 'bodyDisplay',
        sorter: (a, b) => (b.body > a.body ? 1 : -1),
      },
      {
        title: 'Author',
        dataIndex: 'authorDisplay',
        sorter: (a, b) => (b.author > a.author ? 1 : -1),
      },
      {
        title: 'Date',
        dataIndex: 'timestampDisplay',
        sorter: (a, b) => b.timestamp - a.timestamp,
      },
      {
        dataIndex: 'actions',
      },
    ]
    const data = comments.data.map(
      ({author, body, id, parentId, timestamp, voteScore}) => ({
        key: id,
        voteScore,
        voteScoreDisplay: (
          <VoteScore
            className="ph3"
            onIncrement={() => {
              dispatch(
                voteComment({
                  id,
                  option: 'upVote',
                  parentId: postId,
                }),
              )
            }}
            onDecrement={() => {
              dispatch(
                voteComment({
                  id,
                  option: 'downVote',
                  parentId: postId,
                }),
              )
            }}
            voteScore={voteScore}
          />
        ),
        body,
        bodyDisplay: <div className="tl near-black">{body}</div>,
        author,
        authorDisplay: <span className="orange">{author}</span>,
        timestamp,
        timestampDisplay: (
          <span className="silver">{new Date(timestamp).toDateString()}</span>
        ),
        actions: (
          <div>
            <a
              className="ml2 pointer"
              onClick={() => {
                dispatch(toggleCommentForm({id}))
              }}
              role="button"
              tabIndex="0"
            >
              <img alt="edit" className="h1" src={edit} />
            </a>
            <a
              className="ml2 pointer"
              onClick={() => {
                this.delete(id, parentId)
              }}
              role="button"
              tabIndex="0"
            >
              <img alt="delete" className="h1" src={xMark} />
            </a>
          </div>
        ),
      }),
    )
    return (
      <div className={`bg-near-white shadow-1 ${className}`}>
        {comments.status === 'fetched' &&
          (comments.data.length ? (
            <div className="pa2">
              <div className="ph2 flex justify-between items-center">
                <h2 className="mv2 mr2">{`This post have ${comments.data
                  .length} comment${comments.data.length > 1 ? 's' : ''}`}</h2>
                <Button
                  className="pointer"
                  type="primary"
                  onClick={() => {
                    dispatch(toggleCommentForm())
                  }}
                >
                  add a comment
                </Button>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
              />
            </div>
          ) : (
            <div className="ph2 flex justify-between items-center">
              <h4 className="mv2 mr2">
                There is currently not comments in this category.
              </h4>
              <Button
                className="pointer"
                type="primary"
                onClick={() => {
                  dispatch(toggleCommentForm())
                }}
              >
                add a comment
              </Button>
            </div>
          ))}
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
  className: PropTypes.string, // eslint-disable-line
  comments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  formVisible: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  selectedComment: PropTypes.string, // eslint-disable-line
}

export default connect(({comments}, {postId}) => {
  const commentsData =
    comments[postId] &&
    comments[postId].data
      .filter(({parentDeleted}) => !parentDeleted)
      .sort((comment1, comment2) => comment2.voteScore - comment1.voteScore)
  return {
    comments: {
      data: commentsData || [],
      status: (comments[postId] && comments[postId].status) || 'not fetched',
    },
    formVisible: comments.formVisible,
    selectedComment: comments.selectedComment,
  }
})(Comments)
