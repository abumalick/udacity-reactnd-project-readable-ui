import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPosts, getPostsFromCategory} from '../actions/posts'

class Posts extends Component {
  state = {
    orderAsc: false,
    orderBy: 'voteScore',
  }
  componentDidMount() {
    const {category, dispatch} = this.props
    if (category) {
      dispatch(getPostsFromCategory(category))
    } else {
      dispatch(getPosts())
    }
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
    const {posts} = this.props
    const {orderAsc, orderBy} = this.state
    const postData = posts.data
      .slice() // copy the array because sort is not pure
      .sort(
        (post1, post2) =>
          orderAsc
            ? post1[orderBy] > post2[orderBy]
            : post2[orderBy] > post1[orderBy],
      )
    return (
      <div>
        {posts.status === 'fetched'
          ? <table>
              <thead>
                <tr>
                  {Object.entries({
                    voteScore: '',
                    title: 'Title',
                    timestamp: 'Date',
                  }).map(([field, label]) =>
                    <th
                      key={field}
                      className="pointer f6"
                      onClick={() => this.sortBy(field)}
                    >
                      {label}
                      {orderBy === field &&
                        <div className="dib ml2 rotate-90 gray">
                          {orderAsc ? '>' : '<'}
                        </div>}
                    </th>,
                  )}
                </tr>
              </thead>
              <tbody>
                {postData.map(({id, category, title, timestamp, voteScore}) =>
                  <tr key={id}>
                    <td className="ph3 bg-light-gray tc">
                      {voteScore}
                    </td>
                    <td>
                      <Link to={`/${category}/${id}`}>
                        {title}
                      </Link>
                    </td>
                    <td>
                      {new Date(timestamp).toDateString()}
                    </td>
                  </tr>,
                )}
              </tbody>
            </table>
          : <p>There is currently no posts in this category.</p>}

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
  posts: PropTypes.object.isRequired,
}

export default connect(({posts}, {category}) => ({
  posts: category
    ? {
        data: posts.data.filter(post => post.category === category),
        status: posts.status,
      }
    : posts,
}))(Posts)
