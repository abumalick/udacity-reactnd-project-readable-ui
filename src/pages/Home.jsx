import React from 'react'
import PropTypes from 'prop-types'

import Posts from '../components/Posts'

const Home = props => {
  const {match: {params: {category}}} = props
  return (
    <div className="Home">
      <div className="pa3">
        <h1 className="ma0 f3">
          {category ? `Posts for category ${category}` : 'All the posts'}
        </h1>
      </div>
      {<Posts category={category || ''} />}
    </div>
  )
}
Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
