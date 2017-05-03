/* @flow */

import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import s from './Container.css'
import Site from './../Site/Site.container'
import DataContext from './DataContext.container'
import Receipt from '../Receipt/Receipt.container'
import Export from '../Export/Export.component'

injectTapEventPlugin()

export class Container extends React.Component {
  render () {
    return <div className={s.root}>
      <Router history={hashHistory}>
        <Route path='/' component={DataContext}>
          <IndexRoute component={Site} />
          <Route path='export' component={Export} />
          <Route path=':id/:type' component={Receipt} />
        </Route>
      </Router>
    </div>
  }
}
