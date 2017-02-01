/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import s from './OrderOverview.css'

import {firebase} from 'redux-react-firebase'

let keyDownHandler

@firebase()
export default class OrderOverview extends React.Component {
  componentDidMount () {
    keyDownHandler = (ev) => {
      if (ev.which === 27) { // Esc
        this.props.setSelectedOrder() // TODO alert on deselect with unsaved
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    this.props.getOrdersAsync() // TODO insert refreshindicator when loading data, see Login
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', keyDownHandler)
    this.props.clearOrders()
  }

  render () {
    let {selectedEntry} = this.props
    let selId = selectedEntry ? selectedEntry._id : ''

    return (
      <div className={s.root} id='orderOverviewRoot'>
        <OrderTable selectedId={selId} />
      </div>
    )
  }
}

OrderOverview.propTypes = {
  selectedEntry: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  getOrdersAsync: React.PropTypes.func,
  clearOrders: React.PropTypes.func,
  firebase: React.PropTypes.object,
  orders: React.PropTypes.array
}
