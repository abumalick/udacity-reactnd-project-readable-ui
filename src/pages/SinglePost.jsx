import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Post from '../components/Post'
import Comments from '../components/Comments'

class SinglePost extends Component {
  state = {}
  render() {
    const {match: {params: {post}}} = this.props
    return (
      <div>
        <Post postId={post} />

        <Comments postId={post} />
      </div>
    )
  }
}

SinglePost.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SinglePost
