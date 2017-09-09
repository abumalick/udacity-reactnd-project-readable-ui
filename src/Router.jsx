import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'

import Nav from './components/Nav'

const Router = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/edit/:post" component={EditPost} />
        <Route path="/new" component={EditPost} />
        <Route exact path="/:category" component={Home} />
        <Route path="/:category/:post" component={SinglePost} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router
