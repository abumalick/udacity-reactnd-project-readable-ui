import React from 'react'
import PropTypes from 'prop-types'

import Posts from '../components/Posts'

const Home = props => {
  const {match: {params: {category}}} = props
  return (
    <div className="pa3 shadow-1 bg-near-white">
      <h1 className="pl3 pb3 ma0 f3">
        {category ? `Posts for category ${category}` : 'All the posts'}
      </h1>
      <Posts category={category || ''} />
    </div>
  )
}
Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
