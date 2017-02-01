/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import CircularProgress from 'material-ui/CircularProgress'
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
    this.props.getOrdersAsync()
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', keyDownHandler)
    this.props.clearOrders()
  }

  render () {
    let {selectedEntry, entriesLoaded} = this.props
    let selId = selectedEntry ? selectedEntry._id : ''
    return (
      <div className={s.root} id='orderOverviewRoot'>
        {!entriesLoaded &&
          <div className={s.progress}>
            <CircularProgress size={140} />
          </div>
        }
        {entriesLoaded && <OrderTable selectedId={selId} />}
      </div>
    )
  }
}

OrderOverview.propTypes = {
  entriesLoaded: React.PropTypes.bool,
  selectedEntry: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  getOrdersAsync: React.PropTypes.func,
  clearOrders: React.PropTypes.func,
  firebase: React.PropTypes.object,
  orders: React.PropTypes.array
}
