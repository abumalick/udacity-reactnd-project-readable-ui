import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Categories from '../components/Categories'
import Posts from '../components/Posts'

const Home = props => {
  const {match: {params: {category}}} = props
  return (
    <div className="Home">
      <div className="pa3 white bg-near-black">
        <h1 className="ma0 f3">
          {category ? `Posts for category ${category}` : 'All the posts'}
        </h1>
      </div>
      {category
        ? <div className="pa2 bg-lightest-blue">
            <Link to="/">Back to Home</Link>
          </div>
        : <Categories />}
      {<Posts category={category || ''} />}
    </div>
  )
}
Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
