import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import Comments from './Comments'
import VoteScore from './VoteScore'

import {deletePost, getPost, votePost} from '../actions/posts'

class Post extends Component {
  componentDidMount() {
    const {dispatch, postId} = this.props
    dispatch(getPost(postId))
  }
  render() {
    const {
      dispatch,
      fetched,
      post: {author, body, id, timestamp, title, voteScore},
    } = this.props
    if (fetched)
      return (
        <div>
          {id ? (
            <div>
              <div className="bg-near-white shadow-1">
                <div className="ph3">
                  <h1 className="pa3 mb0">{title}</h1>
                </div>
                <div className="ph3 pv1 flex items-stretch bt bb b--moon-silver">
                  <VoteScore
                    className="w3 f3"
                    onIncrement={() => {
                      dispatch(votePost({id, option: 'upVote'}))
                    }}
                    onDecrement={() => {
                      dispatch(votePost({id, option: 'downVote'}))
                    }}
                    voteScore={voteScore}
                  />
                  <p className="ph4 pv1 f4">{body}</p>
                </div>
                <div className="pv1 ph2 flex items-center gray">
                  <div>
                    Written by <span className="orange">{author}</span>
                    {' on '}
                    <span className="dark-gray">
                      {new Date(timestamp).toDateString()}
                    </span>
                  </div>
                  <div className="pv1  ph3 bt b--light-gray no-underline">
                    <Link className="ph1" to={`/edit/${id}`}>
                      <Button>edit</Button>
                    </Link>
                    <Link
                      className="ph1"
                      to="/"
                      onClick={() => dispatch(deletePost(id))}
                    >
                      <Button type="danger">delete</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <Comments className="mt3" postId={id} />
            </div>
          ) : (
            <div className="ph3">
              <h1>Oops... There is nothing here</h1>
              <p>
                {
                  "The post you are trying to view don't exist in the database. Please return to the"
                }{' '}
                <Link to="/">Home Page</Link>
              </p>
            </div>
          )}
        </div>
      )
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    )
  }
}
Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetched: PropTypes.bool, // eslint-disable-line
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}

export default connect((state, {postId}) => ({
  post: state.posts.data[postId] || {},
  fetched:
    state.posts.status === 'fetched' ||
    (state.posts.data[postId] && state.posts.data[postId].status === 'fetched'),
}))(Post)
