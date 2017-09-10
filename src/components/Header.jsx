import React from 'react'
import {Link} from 'react-router-dom'
import Layout from 'antd/lib/layout'
import Menu from './Menu'
import speech from '../icons/speech.svg'

const {Header} = Layout

const MyHeader = () => (
  <Header className="lh-solid h-auto flex items-center">
    <Link className="fl no-underline" to="/">
      <div className="flex mr3 h-auto">
        <img alt="Logo" className="h-auto ph2" src={speech} />
        <h1 className="mv0 white">Readable</h1>
      </div>
    </Link>
    <Menu />
  </Header>
)

MyHeader.propTypes = {}

export default MyHeader
