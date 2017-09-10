import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
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
    const {dispatch, posts} = this.props
    const columns = [
      {
        title: 'Score',
        dataIndex: 'voteScoreDisplay',
        sorter: (a, b) => a.voteScore - b.voteScore,
      },
      {
        title: 'Title',
        dataIndex: 'titleDisplay',
        sorter: (a, b) => (a.title > b.title ? 1 : -1),
      },
      {
        title: 'Author',
        dataIndex: 'author',
        sorter: (a, b) => (a.author > b.author ? 1 : -1),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        sorter: (a, b) => a.timestamp - b.timestamp,
      },
      {
        title: 'Comments',
        dataIndex: 'commentsCount',
        sorter: (a, b) => a.commentsCount - b.commentsCount,
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
    return (
      <div>
        {posts.status === 'fetched' &&
          (posts.data.length ? (
            <Table columns={columns} dataSource={data} pagination={false} />
          ) : (
            <p>There is currently no posts in this category.</p>
          ))}

        <div className="mt3 tc">
          <Link className="blue pointer no-underline" to="/new">
            <Button type="primary">add a new post</Button>
          </Link>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
}

export default connect(({comments, posts}, ownProps) => ({
  comments,
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
      .sort((post1, post2) => post2.voteScore > post1.voteScore),
    status: posts.status,
  },
}))(Posts)
