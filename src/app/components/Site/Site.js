/* @flow */

import React from 'react'

import s from './Site.css'

import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

export default class Site extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <div className='container'>
          <div className='col-md-6'>
            <OrderOverview />
          </div>
          <div className='col-md-6'>
            <OrderToolbar />
          </div>
        </div>
      </div>
    )
  }
}
