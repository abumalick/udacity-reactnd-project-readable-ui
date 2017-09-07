import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {editComment, newComment, toggleCommentForm} from '../actions/comments'
import {changeField, destroyForm, initializeForm} from '../actions/form'
import generateUUID from '../helpers/generateUUID'

class CommentForm extends Component {
  componentWillMount() {
    const {comment, dispatch} = this.props
    dispatch(
      initializeForm({
        author: comment.author || '',
        body: comment.body || '',
      }),
    )
  }
  componentWillUnmount() {
    const {dispatch} = this.props
    dispatch(destroyForm())
  }
  handleChange = event => {
    const {name, value} = event.target
    const {dispatch} = this.props
    dispatch(changeField({key: name, value}))
  }
  submit = () => {
    const {author, body, comment, dispatch, postId} = this.props
    const timestamp = Date.now()
    const callback = success => {
      if (success) {
        dispatch(toggleCommentForm())
      }
    }
    if (comment.id) {
      dispatch(
        editComment({
          id: comment.id,
          author,
          body,
          timestamp,
          callback,
          parentId: comment.parentId,
        }),
      )
    } else {
      const id = generateUUID()
      dispatch(
        newComment({id, author, body, parentId: postId, timestamp, callback}),
      )
    }
  }
  render() {
    const {author = '', body = '', comment, dispatch, error} = this.props
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-70 z-999">
        <div className="pa3 w6 mw-100 absolute center-absolute bg-white tc">
          <h1 className="mt0 f3 tc">
            {comment.id ? 'Edit a comment' : 'Write a new comment'}
          </h1>
          <div className="mb2 flex justify-center items-baseline">
            <label className="w3 dib" htmlFor="author">
              Author:
            </label>
            <input
              className="w5 dib"
              onChange={this.handleChange}
              name="author"
              type="text"
              value={author}
            />
          </div>
          <div className="mb2 flex justify-center">
            <label className="w3 dib" htmlFor="body">
              Body:
            </label>
            <textarea
              className="w5"
              onChange={this.handleChange}
              name="body"
              rows="6"
              value={body}
            />
          </div>
          <div className="tc">
            <button className="mh1" onClick={this.submit}>
              Submit
            </button>
            <button
              className="mh1"
              onClick={() => dispatch(toggleCommentForm())}
            >
              Cancel
            </button>
          </div>
          {error && <p className="mt2 red">{error}</p>}
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  author: PropTypes.string, // eslint-disable-line
  body: PropTypes.string, // eslint-disable-line
  comment: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(({form}) => ({...form}))(CommentForm)
