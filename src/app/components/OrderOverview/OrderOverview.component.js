/* @flow */

import React from 'react'

import Order from './order/Order.container'

import s from './OrderOverview.css'

import RaisedButton from 'material-ui/RaisedButton'

export default class OrderOverview extends React.Component {
  componentDidMount () {
    this.props.getOrdersAsync()
  }

  render () {
    let { entries, selectedEntry } = this.props
    let selId = selectedEntry ? selectedEntry._id : ''

    return (
      <div className={s.root}>
        <h1>Ordreoversigt</h1>
        <RaisedButton label='Default' />
        {
          entries.map(order => {
            return (
              <div className='row' key={order.PlumbingOrder._id}>
                <Order key={order.PlumbingOrder._id}
                  isSelected={order.PlumbingOrder._id === selId}
                  order={order.PlumbingOrder} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

OrderOverview.propTypes = {
  entries: React.PropTypes.array,
  selectedEntry: React.PropTypes.object,
  getOrdersAsync: React.PropTypes.func
}
