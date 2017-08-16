import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteComment, getComments} from '../actions/comments'

import CommentForm from './CommentForm'

import edit from '../icons/edit.svg'
import xMark from '../icons/x-mark.svg'

class Comments extends Component {
  state = {
    modal: false,
    orderAsc: false,
    orderBy: 'voteScore',
    selectedComment: undefined,
  }
  componentDidMount() {
    const {dispatch, postId} = this.props
    dispatch(getComments(postId))
  }
  toggleModal = () => {
    this.setState(state => ({modal: !state.modal}))
  }
  delete = (id, parentId) => {
    this.props.dispatch(deleteComment({id, parentId}))
  }
  render() {
    const {comments, dispatch, postId} = this.props
    const {modal, orderAsc, orderBy, selectedComment} = this.state
    const commentsData = comments.data
      .slice() // copy the array because sort is not pure
      .sort(
        (comment1, comment2) =>
          orderAsc
            ? comment2[orderBy] < comment1[orderBy]
            : comment2[orderBy] > comment1[orderBy],
      )
    return (
      <div>
        {comments.status === 'fetched' &&
          (commentsData.length
            ? <div>
                <div className="ph2 flex justify-between items-baseline bg-light-gray">
                  <h3 className="mv2">Comments</h3>
                  <div>
                    order by:
                    {Object.entries({
                      timestamp: 'date',
                      voteScore: 'score',
                    }).map(([field, label]) =>
                      <button
                        key={field}
                        className={`ml1 pointer ${orderBy === field
                          ? 'b--orange'
                          : ''}`}
                        onClick={() => this.setState({orderBy: field})}
                      >
                        {label}
                      </button>,
                    )}
                    <button
                      className="bn bg-transparent ml1 f6 pointer underline"
                      onClick={() =>
                        this.setState(state => ({orderAsc: !state.orderAsc}))}
                    >
                      {orderAsc ? 'desc' : 'asc'}
                    </button>
                  </div>
                </div>
                <table>
                  <tbody>
                    {commentsData.map(comment =>
                      <tr key={comment.id}>
                        <td className="ph3 bg-light-gray gray">
                          {comment.voteScore}
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
                              this.setState(
                                {selectedComment: comment},
                                this.toggleModal(),
                              )
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
                      </tr>,
                    )}
                  </tbody>
                </table>
              </div>
            : <p>There is currently not comments in this category.</p>)}
        <div className="pv1 bg-light-gray tc">
          <button
            className="pointer"
            onClick={() => {
              this.setState({selectedComment: undefined}, this.toggleModal())
            }}
          >
            add a comment
          </button>
        </div>
        {modal &&
          <CommentForm
            comment={selectedComment || {}}
            dispatch={dispatch}
            postId={postId}
            toggleModal={this.toggleModal}
          />}
      </div>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(({comments}, {postId}) => ({
  comments: comments[postId] || {data: [], status: 'not fetched'},
}))(Comments)
