/* @flow */

import React from 'react'
import {firebase} from 'redux-react-firebase'

@firebase([
  ['locksAndKeys']
])
export default class DataContext extends React.Component {
  componentDidMount () {
    this.props.getOrdersAsync()
    // TODO add auto refresh interval
  }

  componentWillUnmount () {
    this.props.clearOrders()
  }
  render () {
    let {children} = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}
DataContext.propTypes = {
  children: React.PropTypes.object,
  clearOrders: React.PropTypes.func.isRequired,
  getOrdersAsync: React.PropTypes.func.isRequired
}
