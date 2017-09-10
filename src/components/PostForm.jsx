import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Input, Select} from 'antd'

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
    const {dispatch} = this.props
    if (event.target) {
      const {name, value} = event.target
      dispatch(changeField({key: name, value}))
    } else {
      // It is the select
      console.log(event)
      dispatch(changeField({key: 'category', value: event}))
    }
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
      <div className="pa3 w6 bg-white tc">
        <h1 className="mt0 f3 tc">
          {post.id ? 'Edit a post' : 'Write a new post'}
        </h1>
        <div className="mb2 flex justify-center items-baseline">
          <label className="w3 dib" htmlFor="author">
            Author:
          </label>
          <Input
            className="w5"
            onChange={this.handleChange}
            name="author"
            placeholder="Your name"
            type="text"
            value={author}
          />
        </div>
        <div className="mb2 flex justify-center items-baseline">
          <label className="w3 dib" htmlFor="title">
            Title:
          </label>
          <Input
            className="w5"
            onChange={this.handleChange}
            name="title"
            placeholder="Title of the post"
            type="text"
            value={title}
          />
        </div>
        <div className="mb2 flex justify-center">
          <label className="w3 dib" htmlFor="body">
            Body:
          </label>
          <Input.TextArea
            className="w5"
            onChange={this.handleChange}
            name="body"
            placeholder="What you want to say"
            rows="6"
            value={body}
          />
        </div>
        <div className="mb2 flex justify-center">
          <label className="pt1 w3 dib" htmlFor="category">
            Category:
          </label>
          <Select
            className="w5"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
            onChange={this.handleChange}
            optionFilterProp="children"
            placeholder="Choose a category"
            name="category"
            showSearch
            value={category}
          >
            {categories.data.map(({name, path}) => (
              <Select.Option key={path} value={path}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="tc">
          <Button className="mh1" type="primary" onClick={this.submit}>
            Submit
          </Button>
          <Button
            className="mh1"
            onClick={() => {
              history.goBack()
            }}
            type="danger"
          >
            Back
          </Button>
        </div>
        {error && <p className="mt2 red">{error}</p>}
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
