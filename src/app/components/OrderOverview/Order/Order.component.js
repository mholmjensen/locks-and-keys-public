/* @flow */
import React from 'react'
import s from './Order.css'

export default class Order extends React.Component {
  render () {
    let { order, isSelected, setSelectedOrder } = this.props
    let po = order
    // let tt = JSON.stringify(po, null, 2)
    let clickHandler = (e) => {
      setSelectedOrder(po)
    }
    let orderCssClass = isSelected ? s.selectedOrder : s.order
    return (
      <div className={s.root} onClick={(e) => clickHandler(e)}>
        <div className={orderCssClass}>
          <h3>{po.stand_name} // {po.contact_name} // {po.human_readable_id}</h3>
        </div>
      </div>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object,
  isSelected: React.PropTypes.bool,
  setSelectedOrder: React.PropTypes.func
}
