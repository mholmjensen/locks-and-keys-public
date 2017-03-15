/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

import s from './Export.css'

@firebase([
  ['locksAndKeys']
])
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`),
    orders: state.orders.entries
  })
)
class Export extends React.Component {
  render () {
    let {orders, locksAndKeys} = this.props
    orders = orders.sort((o1, o2) => o1.human_readable_id - o2.human_readable_id)
    return <div>
      <table id='export' className={s.table}>
        <tbody>
          <tr>
            <th>#</th>
            <th>Stand Number</th>
            <th>Stand Name</th>
            <th>Name</th>
            <th>Email/Phone</th>
            <th>Locks out</th>
            <th>Locks returned</th>
            <th>Keys out</th>
            <th>Keys returned</th>
            <th>Toilet A</th>
            <th>Toilet B</th>
            <th>Urinalsøjle</th>
            <th>Areas</th>
            <th>Status</th>
          </tr>
          {
            orders.map((o, index) => {
              let lak = locksAndKeys[o._id] ? locksAndKeys[o._id] : {}
              let findItem = (name) => o['PlumbingItem'].find(i => i.name === name) || {quantity: 0}
              let aQuantity = findItem('Toilet A').quantity
              let bQuantity = findItem('Toilet B').quantity
              let uQuantity = findItem('Urinalsøjle').quantity
              return <tr key={'export-' + index}>
                <td>{o.human_readable_id}</td>
                <td>{o.rf_identifier}</td>
                <td>{o.stand_name}</td>
                <td>{o.contact_name}</td>
                <td>{o.contact_email} / {o.contact_phone}</td>
                <td>{lak.locksHandedOut}</td>
                <td>{lak.locksReturned}</td>
                <td>{lak.keysHandedOut}</td>
                <td>{lak.keysReturned}</td>
                <td>{aQuantity}</td>
                <td>{bQuantity}</td>
                <td>{uQuantity}</td>
                <td>{o.people_pro_location}</td>
                <td>{o.OrderStatus}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  }
}

Export.propTypes = {
  orders: React.PropTypes.array,
  locksAndKeys: React.PropTypes.object
}

export default Export
