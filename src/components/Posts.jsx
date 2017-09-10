import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import Table from 'antd/lib/table'
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
  componentDidMount() {
    this.getPosts()
  }
  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getPosts()
    }
  }
  getPosts = () => {
    const {category, dispatch} = this.props
    const callback = (success, response) => {
      if (success) {
        // We need the comments count for all posts, so let's fetch:
        response.data.forEach(({id, deleted}) => {
          if (id && !deleted) {
            dispatch(getComments(id))
          }
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
    const {category: categoryPath, categoryName, dispatch, posts} = this.props
    const columns = [
      {
        title: 'Score',
        dataIndex: 'voteScoreDisplay',
        sorter: (a, b) => b.voteScore - a.voteScore,
      },
      {
        title: 'Title',
        dataIndex: 'titleDisplay',
        sorter: (a, b) => (b.title > a.title ? 1 : -1),
      },
      {
        title: 'Author',
        dataIndex: 'author',
        sorter: (a, b) => (b.author > a.author ? 1 : -1),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        sorter: (a, b) => b.timestamp - a.timestamp,
      },
      {
        title: 'Comments',
        dataIndex: 'commentsCount',
        sorter: (a, b) => b.commentsCount - a.commentsCount,
      },
      {
        dataIndex: 'actions',
      },
    ]
    const data = posts.data.map(
      ({id, author, category, commentsCount, title, timestamp, voteScore}) => ({
        key: id,
        voteScore,
        voteScoreDisplay: (
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
        ),
        title,
        titleDisplay: (
          <div className="tl">
            <Link to={`/${category}/${id}`}>{title}</Link>
          </div>
        ),
        author,
        timestamp,
        date: new Date(timestamp).toDateString(),
        commentsCount,
        actions: (
          <div>
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
          </div>
        ),
      }),
    )
    if (posts.status === 'fetched')
      return (
        <div>
          {!categoryPath || categoryName ? (
            <div>
              <h1 className="pl3 pb3 ma0 f3">
                {categoryName ? (
                  `Posts for category ${categoryName}`
                ) : (
                  'All the posts'
                )}
              </h1>
              {posts.data.length ? (
                <Table columns={columns} dataSource={data} pagination={false} />
              ) : (
                <p>There is currently no posts in this category.</p>
              )}

              <div className="mt3 tc">
                <Link className="blue pointer no-underline" to="/new">
                  <Button type="primary">add a new post</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="pb3">
              <h1>Oops... There is nothing here</h1>
              <p>
                {
                  "The category you are trying to view don't exist in the database. Please return to the"
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

Posts.propTypes = {
  category: PropTypes.string, // eslint-disable-line
  categoryName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
}

export default connect(({categories, comments, posts}, ownProps) => {
  const currentCategory = categories.data.find(
    ({path}) => path === ownProps.category,
  )
  return {
    comments,
    category: ownProps.category,
    categoryName: currentCategory ? currentCategory.name : '',
    posts: {
      data: Object.values(posts.data)
        // remove deleted keep only selected category (if selected)
        .filter(
          ({category, deleted, id}) =>
            !deleted &&
            id &&
            (!ownProps.category || category === ownProps.category),
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
        .sort((post1, post2) => post2.voteScore > post1.voteScore),
      status: posts.status,
    },
  }
})(Posts)
