import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import VoteScore from './VoteScore'
import {
  deletePost,
  getPosts,
  getPostsFromCategory,
  votePost,
} from '../actions/posts'
import {getComments} from '../actions/comments'
import edit from '../icons/edit.svg'
import xMark from '../icons/x-mark.svg'

class Posts extends Component {
  state = {
    orderAsc: false,
    orderBy: 'voteScore',
  }
  componentDidMount() {
    const {category, dispatch} = this.props
    const callback = (success, response) => {
      if (success) {
        // We need the comments count for all posts, so let's fetch:
        response.data.forEach(({id}) => {
          dispatch(getComments(id))
        })
      }
    }
    if (category) {
      dispatch(getPostsFromCategory(category, callback))
    } else {
      dispatch(getPosts(callback))
    }
  }
  delete = id => {
    this.props.dispatch(deletePost(id))
  }
  sortBy = field => {
    this.setState(
      state =>
        state.orderBy === field
          ? {orderAsc: !state.orderAsc}
          : {orderAsc: true, orderBy: field},
    )
  }
  render() {
    const {comments, dispatch, posts} = this.props
    const {orderAsc, orderBy} = this.state
    const postData = Object.values(posts.data)
      .filter(({deleted}) => !deleted)
      // add commentsCount to the array
      .map(post => ({
        ...post,
        commentsCount:
          comments[post.id] &&
          comments[post.id].data &&
          comments[post.id].data.length,
      }))
      .sort(
        (post1, post2) =>
          orderAsc
            ? post1[orderBy] > post2[orderBy]
            : post2[orderBy] > post1[orderBy],
      )
    return (
      <div>
        {posts.status === 'fetched' &&
          (postData.length ? (
            <table>
              <thead>
                <tr>
                  {Object.entries({
                    voteScore: '',
                    title: 'Title',
                    author: 'Author',
                    timestamp: 'Date',
                    commentsCount: 'Comments',
                  }).map(([field, label]) => (
                    <th
                      key={field}
                      className="pointer f6"
                      onClick={() => this.sortBy(field)}
                    >
                      {label}
                      {orderBy === field && (
                        <div className="dib ml2 rotate-90 gray">
                          {orderAsc ? '>' : '<'}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {postData.map(
                  ({
                    id,
                    author,
                    category,
                    commentsCount,
                    title,
                    timestamp,
                    voteScore,
                  }) => (
                    <tr key={id}>
                      <td>
                        <VoteScore
                          className="ph3"
                          onIncrement={() => {
                            dispatch(votePost({id, option: 'upVote'}))
                          }}
                          onDecrement={() => {
                            dispatch(votePost({id, option: 'downVote'}))
                          }}
                          voteScore={voteScore}
                        />
                      </td>
                      <td>
                        <Link to={`/${category}/${id}`}>{title}</Link>
                      </td>
                      <td>{author}</td>
                      <td>{new Date(timestamp).toDateString()}</td>
                      <td className="tc">{commentsCount}</td>
                      <td>
                        <Link className="ml2" to={`/edit/${id}`}>
                          <img alt="edit" className="h1" src={edit} />
                        </Link>
                        <a
                          className="ml2 pointer"
                          onClick={() => {
                            this.delete(id)
                          }}
                          role="button"
                          tabIndex="0"
                        >
                          <img alt="delete" className="h1" src={xMark} />
                        </a>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          ) : (
            <p>There is currently no posts in this category.</p>
          ))}

        <div className="bg-light-gray tc">
          <Link className="blue pointer no-underline" to="/new">
            add a new post
          </Link>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  category: PropTypes.string.isRequired,
  comments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
}

export default connect(({comments, posts}, {category}) => ({
  posts: category
    ? {
        data: Object.values(posts.data).reduce(
          (obj, post) =>
            post.category === category ? {...obj, [post.id]: post} : obj,
          {},
        ),
        status: posts.status,
      }
    : posts,
  comments,
}))(Posts)
