import React from 'react'
import PropTypes from 'prop-types'

import Post from '../components/Post'
import Comments from '../components/Comments'

const SinglePost = ({match: {params: {post}}}) => (
  <div>
    <Post postId={post} />
    <Comments postId={post} />
  </div>
)

SinglePost.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SinglePost
