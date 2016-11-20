/* @flow */

import React from 'react'

import s from './Container.css'

import Site from './../Site/Site'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
injectTapEventPlugin()

export class Container extends React.Component {
  render () {
    return <div className={s.root}>
      <MuiThemeProvider>
        <Site />
      </MuiThemeProvider>
    </div>
  }
}
