import React from 'react'
import PropTypes from 'prop-types'

import Posts from '../components/Posts'

const Home = props => {
  const {match: {params: {category}}} = props
  return (
    <div className="pa3 shadow-1 bg-near-white">
      <Posts category={category || ''} />
    </div>
  )
}
Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
