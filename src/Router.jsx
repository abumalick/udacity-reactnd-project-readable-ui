import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from 'antd/lib/layout'

import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'

import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'

const {Content, Footer} = Layout

const Router = () => (
  <BrowserRouter>
    <Layout className="min-vh-100">
      <Header />
      <Content className="center" style={{maxWidth: '1200px'}}>
        <Breadcrumb />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/edit/:post" component={EditPost} />
          <Route path="/new" component={EditPost} />
          <Route exact path="/:category" component={Home} />
          <Route path="/:category/:post" component={SinglePost} />
        </Switch>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Created with love by abumalick
      </Footer>
    </Layout>
  </BrowserRouter>
)

export default Router
