import React from 'react'
import PropTypes from 'prop-types'
import PostForm from '../components/PostForm'

const EditPost = ({match: {params: {post}}}) => <PostForm postId={post} />

EditPost.propTypes = {
  match: PropTypes.object, // eslint-disable-line
}

export default EditPost
