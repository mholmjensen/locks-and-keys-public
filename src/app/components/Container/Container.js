/* @flow */

import React from 'react'

import s from './Container.css'

import Site from './../Site/Site.container'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {cyan500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    canvasColor: '#fbfbfb',
    primary1Color: '#ec5400',
    accent1Color: cyan500
  },
  tableRowColumn: {
    spacing: 6
  },
  card: {
    titleColor: '#ec5400'
  }
})

export class Container extends React.Component {
  render () {
    return <div className={s.root}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Site />
      </MuiThemeProvider>
    </div>
  }
}
