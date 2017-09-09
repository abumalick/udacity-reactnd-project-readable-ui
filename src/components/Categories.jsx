import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'

import {getCategories} from '../actions/categories'

class Categories extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getCategories())
  }
  render() {
    const {categories} = this.props
    return (
      <div className="ph2 flex items-center white">
        <ul className="dib mv2">
          <li className="mh1 dib">
            <NavLink
              activeClassName="bb b--white"
              className="pa2 near-white no-underline"
              exact
              to={`/`}
            >
              Home
            </NavLink>
          </li>
          {categories.data.map(({name, path}) => (
            <li key={path} className="mh1 dib">
              <NavLink
                activeClassName="bb b--white"
                className="pa2 near-white no-underline"
                exact
                to={`/${path}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(
  connect(({categories}) => ({
    categories,
  }))(Categories),
)
