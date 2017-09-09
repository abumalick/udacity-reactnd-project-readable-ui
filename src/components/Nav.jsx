import React from 'react'
import {Link} from 'react-router-dom'
import Categories from './Categories'
import speech from '../icons/speech.svg'

const Nav = () => (
  <div className="flex pa2 white bg-near-black">
    <Link className="white no-underline" to="/">
      <div className="flex mr3">
        <img alt="Logo" className="ph2" src={speech} />
        <h1 className="mv0">Readable</h1>
      </div>
    </Link>
    <Categories />
  </div>
)

Nav.propTypes = {}

export default Nav
