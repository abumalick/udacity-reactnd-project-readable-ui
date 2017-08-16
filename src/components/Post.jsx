import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {deletePost, getPost} from '../actions/posts'

class Post extends Component {
  state = {}
  componentDidMount() {
    const {dispatch, postId} = this.props
    dispatch(getPost(postId))
  }
  render() {
    const {
      dispatch,
      post: {author, body, id, timestamp, title, voteScore},
    } = this.props
    return (
      <div>
        {id
          ? <div>
              <div className="pa2 bg-lightest-blue">
                <Link to="/">Back to Home</Link>
              </div>
              <div className="flex items-stretch bb b--light-gray">
                <div className="flex flex-column justify-center items-center w3 bg-near-white f3 tc">
                  {voteScore}
                </div>
                <div className="ph3 pv2 flex flex-column justify-center items-start">
                  <h1 className="mb0 f5">
                    {title}
                  </h1>
                </div>
              </div>
              <p className="ph3">
                {body}
              </p>
              <div className="pv0 ph2 bt b--light-gray no-underline">
                <Link className="ph2" to={`/edit/${id}`}>
                  edit
                </Link>
                <Link
                  className="ph2"
                  to="/"
                  onClick={() => dispatch(deletePost(id))}
                >
                  delete
                </Link>
              </div>
              <div className="pv1 ph2 flex justify-between gray bg-lightest-blue">
                <div>
                  Written by <span className="orange">{author}</span>
                </div>
                <div>
                  on{' '}
                  <span className="dark-gray">
                    {new Date(timestamp).toDateString()}
                  </span>
                </div>
              </div>
            </div>
          : <p>There is no post here</p>}
      </div>
    )
  }
}
Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}

export default connect((state, {postId}) => ({
  post: state.posts.data.filter(({id}) => id === postId)[0] || {},
}))(Post)
