/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import s from './Site.css'

import Login from '../Login/Login.container'
import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import Receipt from '../Receipt/Receipt.container'
import DataContext from './DataContext.container'
import HeaderBar from './HeaderBar.component'

@firebase()
@connect(
  ({firebase}) => ({
    auth: helpers.pathToJS(firebase, 'auth')
  })
)
export default class Site extends React.Component {
  render () {
    let {auth, firebase} = this.props
    if (!auth) {
      return <Login />
    } else {
      let signout = () => firebase.logout()
      let OrderView = ({props}) =>
        <div className={s.root}>
          <div>
            <HeaderBar signout={signout} />
          </div>
          <div className={s.container}>
            <OrderOverview />
          </div>
          <div>
            <OrderToolbar />
          </div>
        </div>
      return (
        <Router history={hashHistory}>
          <Route path='/' component={DataContext}>
            <IndexRoute component={OrderView} />
            <Route path=':id/:type' component={Receipt} />
          </Route>
        </Router>
      )
    }
  }
}
Site.propTypes = {
  firebase: React.PropTypes.object,
  auth: React.PropTypes.object
}
