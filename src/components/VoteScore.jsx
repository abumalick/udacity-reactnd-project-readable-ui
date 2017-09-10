import React from 'react'
import PropTypes from 'prop-types'

const VoteScore = ({className, onIncrement, onDecrement, voteScore}) => (
  <div
    className={`flex flex-column justify-center items-center ${className} bg-near-white tc br-pill`}
  >
    <a
      className="pointer rotate-90"
      onClick={onIncrement}
      role="button"
      style={{textDecoration: 'none'}}
      tabIndex="0"
    >
      {'<'}
    </a>
    {voteScore}
    <a
      className="pointer rotate-90"
      onClick={onDecrement}
      role="button"
      style={{textDecoration: 'none'}}
      tabIndex="0"
    >
      {'>'}
    </a>
  </div>
)

VoteScore.defaultProps = {
  className: '',
}
VoteScore.propTypes = {
  className: PropTypes.string,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
}

export default VoteScore
