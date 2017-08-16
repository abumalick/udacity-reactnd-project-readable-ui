import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {getCategories} from '../actions/categories'

class Categories extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getCategories())
  }
  render() {
    const {categories} = this.props
    return (
      <div className="ph2 flex items-center bg-lightest-blue">
        <span>Categories:</span>
        <ul className="dib mv2">
          {categories.data.map(({name, path}) =>
            <li key={path} className="mh1 dib">
              <Link className="ph1" to={`/${path}`}>
                {name}
              </Link>
            </li>,
          )}
        </ul>
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({categories}) => ({
  categories,
}))(Categories)
