import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'

const Router = () =>
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/:category" component={Home} />
      <Route path="/edit/:post" component={EditPost} />
      <Route path="/new" component={EditPost} />
      <Route path="/:category/:post" component={SinglePost} />
    </div>
  </BrowserRouter>

export default Router
