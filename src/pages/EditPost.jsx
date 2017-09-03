import React, {Component} from 'react'
import PropTypes from 'prop-types'

import PostForm from '../components/PostForm'

class EditPost extends Component {
  state = {}
  render() {
    const {match: {params: {post}}} = this.props
    return (
      <div>
        <PostForm postId={post} />
      </div>
    )
  }
}

EditPost.propTypes = {
  match: PropTypes.object, // eslint-disable-line
}

export default EditPost
