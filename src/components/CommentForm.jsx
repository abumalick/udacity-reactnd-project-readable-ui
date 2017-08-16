import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {editComment, newComment} from '../actions/comments'

import generateUUID from '../helpers/generateUUID'

class CommentForm extends Component {
  constructor(props, context) {
    super(props, context)
    const {comment} = props
    if (comment.id) {
      this.state = {
        body: comment.body,
      }
    } else {
      this.state = {
        author: '',
        body: '',
      }
    }
  }

  // id: Any unique ID. As with posts, UUID is probably the best here.
  // timestamp: timestamp. Get this however you want.
  // body: String
  // author: String
  // parentId: Should match a post id in the database.
  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }
  submit = () => {
    const {comment, dispatch, postId, toggleModal} = this.props
    const {body, author} = this.state
    const timestamp = Date.now()
    const callback = success => {
      if (success) {
        toggleModal()
      } else {
        this.setState({
          error: 'There was a problem contacting, API, please retry',
        })
      }
    }
    if (comment.id) {
      dispatch(
        editComment({
          id: comment.id,
          body,
          timestamp,
          callback,
          parentId: comment.parentId,
        }),
      )
    } else {
      const id = generateUUID()
      dispatch(
        newComment({id, body, author, parentId: postId, timestamp, callback}),
      )
    }
  }
  render() {
    const {comment, toggleModal} = this.props
    const {body, author, error} = this.state
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-70 z-999">
        <div className="pa3 w6 mw-100 absolute center-absolute bg-white tc">
          <h1 className="mt0 f3 tc">
            {comment.id ? 'Edit a comment' : 'Write a new comment'}
          </h1>
          {!comment.id &&
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
            </div>}
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
            <button className="mh1" onClick={toggleModal}>
              Cancel
            </button>
          </div>
          {error &&
            <p className="mt2 red">
              {error}
            </p>}
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export default CommentForm
