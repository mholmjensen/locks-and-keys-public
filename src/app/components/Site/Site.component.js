/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

import s from './Site.css'

import Login from '../Login/Login.container'
import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

@firebase()
class HeaderBar extends React.Component {
  render () {
    let {firebase} = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <IconMenu iconButtonElement={
            <IconButton touch>
              <NavigationExpandMoreIcon />
            </IconButton>
            }>
            <MenuItem primaryText='Sign out' onClick={() => firebase.logout()} />
          </IconMenu>
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text='Locks and keys - Roskilde Festival' />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
HeaderBar.propTypes = {
  firebase: React.PropTypes.object
}

@firebase()
@connect(
  ({firebase}) => ({
    auth: helpers.pathToJS(firebase, 'auth')
  })
)
export default class Site extends React.Component {
  render () {
    let {auth} = this.props
    console.log(auth)
    if (!auth) {
      return <Login />
    } else {
      return (
        <div className={s.root}>
          <div>
            <HeaderBar />
          </div>
          <div className={s.container}>
            <OrderOverview />
          </div>
          <div>
            <OrderToolbar />
          </div>
        </div>
      )
    }
  }
}
Site.propTypes = {
  firebase: React.PropTypes.object,
  auth: React.PropTypes.object
}
