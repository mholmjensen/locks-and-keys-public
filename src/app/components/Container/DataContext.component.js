/* @flow */

import React from 'react'
import {I18nextProvider} from 'react-i18next'
import i18n from './translations/i18n.js'

export default class DataContext extends React.Component {
  componentDidMount () {
    this.props.getOrdersAsync()
  }

  componentWillUnmount () {
    this.props.clearOrders()
  }
  render () {
    let {children} = this.props
    return (
      <div>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </div>
    )
  }
}
DataContext.propTypes = {
  children: React.PropTypes.object,
  clearOrders: React.PropTypes.func.isRequired,
  getOrdersAsync: React.PropTypes.func.isRequired
}
