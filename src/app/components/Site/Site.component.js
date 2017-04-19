/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

import s from './Site.css'

import Login from '../Login/Login.container'
import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import HeaderBar from './HeaderBar.component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    canvasColor: '#fafafa',
    primary1Color: '#ec5400',
    accent1Color: '#ffffff'
  },
  tableRowColumn: {
    spacing: 6
  },
  card: {
    titleColor: '#ec5400'
  }
})

class SiteProviders extends React.Component {
  render () {
    return <MuiThemeProvider muiTheme={muiTheme}>
      {this.props.children}
    </MuiThemeProvider>
  }
}

SiteProviders.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}

@firebase()
@connect(
  ({firebase}) => ({
    auth: helpers.pathToJS(firebase, 'auth')
  })
)
export default class Site extends React.Component {
  render () {
    let {auth, firebase, clearOrders} = this.props
    if (!auth) {
      return <SiteProviders>
        <Login />
      </SiteProviders>
    } else {
      let signout = () => {
        clearOrders()
        firebase.logout()
      }
      return <SiteProviders>
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
      </SiteProviders>
    }
  }
}
Site.propTypes = {
  firebase: React.PropTypes.object,
  auth: React.PropTypes.object,
  clearOrders: React.PropTypes.func.isRequired
}
