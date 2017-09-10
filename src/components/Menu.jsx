import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Menu from 'antd/lib/menu'

import {getCategories} from '../actions/categories'

class Categories extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getCategories())
  }
  render() {
    const {categories, location} = this.props
    return (
      <Menu
        mode="horizontal"
        selectable={false}
        selectedKeys={[location.pathname]}
        theme="dark"
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        {categories.data.map(({name, path}) => (
          <Menu.Item key={`/${path}`}>
            <Link to={`/${path}`}>{name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(
  connect(({categories}) => ({
    categories,
  }))(Categories),
)
