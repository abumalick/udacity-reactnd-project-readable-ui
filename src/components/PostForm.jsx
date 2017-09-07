import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {editPost, getPost, newPost} from '../actions/posts'
import {getCategories} from '../actions/categories'
import {
  changeField,
  destroyForm,
  saveError,
  initializeForm,
} from '../actions/form'

import generateUUID from '../helpers/generateUUID'

class PostForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.initForm(props.post)
  }

  componentWillMount() {
    const {post} = this.props
    this.initForm(post)
  }
  componentDidMount() {
    const {dispatch, postId} = this.props
    if (postId) dispatch(getPost(postId))
    dispatch(getCategories())
  }
  componentWillReceiveProps(newProps) {
    if (newProps.post.id !== this.props.post.id) {
      this.initForm(newProps.post)
    }
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
  initForm = post => {
    const {dispatch} = this.props
    dispatch(
      initializeForm({
        author: post.author || '',
        body: post.body || '',
        category: post.category || '',
        title: post.title || '',
      }),
    )
  }
  submit = () => {
    const {dispatch, form: {author, body, category, title}, post} = this.props
    if (!author || !body || !category || !title) {
      dispatch(
        saveError({
          error: 'All fields must be filled',
        }),
      )
      return
    }
    const {router: {history}} = this.context
    const timestamp = Date.now()
    const id = post.id || generateUUID()
    const callback = success => {
      if (success) {
        history.push(`/${category}/${id}`)
      } else {
        dispatch(
          saveError({
            error: 'There was a problem contacting, API, please retry',
          }),
        )
      }
    }
    if (post.id) {
      dispatch(
        editPost({
          id,
          author,
          body,
          category,
          title,
          timestamp,
          callback,
        }),
      )
    } else {
      dispatch(
        newPost({id, author, body, category, title, timestamp, callback}),
      )
    }
  }
  render() {
    const {
      categories,
      form: {author = '', body = '', category, error, title = ''},
      post,
    } = this.props
    const {router: {history}} = this.context
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-70 z-999">
        <div className="pa3 w6 mw-100 absolute center-absolute bg-white tc">
          <h1 className="mt0 f3 tc">
            {post.id ? 'Edit a post' : 'Write a new post'}
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
          <div className="mb2 flex justify-center items-baseline">
            <label className="w3 dib" htmlFor="title">
              Title:
            </label>
            <input
              className="w5 dib"
              onChange={this.handleChange}
              name="title"
              type="text"
              value={title}
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
          <div className="mb2 flex justify-center">
            <label className="w3 dib" htmlFor="category">
              Category:
            </label>
            <select
              className="w5 dib"
              defaultValue=""
              onChange={this.handleChange}
              name="category"
              type="text"
              value={category}
            >
              <option value="" disabled>
                Choose a category
              </option>
              {categories.data.map(({name, path}) => (
                <option key={path} value={path}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="tc">
            <button className="mh1" onClick={this.submit}>
              Submit
            </button>
            <button
              className="mh1"
              onClick={() => {
                history.goBack()
              }}
            >
              Back
            </button>
          </div>
          {error && <p className="mt2 red">{error}</p>}
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  categories: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postId: PropTypes.string, // eslint-disable-line
}
PostForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(({categories, form, posts}, {postId}) => ({
  form,
  categories,
  post: posts.data[postId] || {},
}))(PostForm)
