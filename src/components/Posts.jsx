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
import {initializeOrder, orderBy, switchOrder} from '../actions/order'
import {getComments} from '../actions/comments'
import edit from '../icons/edit.svg'
import xMark from '../icons/x-mark.svg'

class Posts extends Component {
  componentWillMount() {
    const {dispatch} = this.props
    dispatch(initializeOrder({id: 'posts'}))
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
  render() {
    const {dispatch, order, posts} = this.props
    return (
      <div>
        {posts.status === 'fetched' &&
          (posts.data.length ? (
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
                      onClick={() => {
                        if (order.by === field) {
                          dispatch(switchOrder({id: 'posts', field}))
                        } else {
                          dispatch(orderBy({id: 'posts', field}))
                        }
                      }}
                    >
                      {label}
                      {order.by === field && (
                        <div className="dib ml2 rotate-90 gray">
                          {order.asc ? '<' : '>'}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.data.map(
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
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
}

export default connect(({comments, order, posts}, ownProps) => {
  const orderPosts = order.posts || {}
  return {
    comments,
    order: orderPosts,
    posts: {
      data: Object.values(posts.data)
        // remove deleted keep only selected category (if selected)
        .filter(
          ({category, deleted}) =>
            !deleted && (!ownProps.category || category === ownProps.category),
        )
        // add commentsCount to the array
        .map(post => ({
          ...post,
          commentsCount:
            comments[post.id] &&
            comments[post.id].data &&
            comments[post.id].data.length,
        }))
        // order
        .sort(
          (post1, post2) =>
            orderPosts.asc
              ? post1[orderPosts.by] > post2[orderPosts.by]
              : post2[orderPosts.by] > post1[orderPosts.by],
        ),
      status: posts.status,
    },
  }
})(Posts)
