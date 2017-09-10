import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import Breadcrumb from 'antd/lib/breadcrumb'

const MyBreadcrumb = ({matches, matchNames}) => {
  let constructPath = ''
  return (
    <Breadcrumb style={{margin: '12px 0'}}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {matches.map((match, index) => {
        constructPath += `/${match}`
        if (match === 'edit') return null
        return (
          <Breadcrumb.Item key={match}>
            <Link to={constructPath}>{matchNames[index]}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

MyBreadcrumb.propTypes = {
  matches: PropTypes.array.isRequired,
  matchNames: PropTypes.array.isRequired,
}

export default withRouter(
  connect(({categories, posts}, {location}) => {
    const matches = location.pathname.split('/').filter(path => path)
    // we get the category for this path
    const category = categories.data.find(({path}) => path === matches[0])
    // we get the post for this path
    const post = posts.data[matches[1]]
    return {
      matches,
      matchNames: [
        category ? category.name : matches[0],
        post ? post.title : matches[1],
      ],
    }
  })(MyBreadcrumb),
)
