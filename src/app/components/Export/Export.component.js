/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
import {translate} from 'react-i18next'

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
    let {orders, locksAndKeys, t} = this.props
    orders = orders.sort((o1, o2) => o1.human_readable_id - o2.human_readable_id)
    return <div>
      <table id='export' className={s.table}>
        <tbody>
          <tr>
            <th>#</th>
            <th>{t('Stand ID')}</th>
            <th>{t('Stand')}</th>
            <th>{t('Contact')}</th>
            <th>{t('Email')}/{t('Phone')}</th>
            <th>{t('Locks')} {t('Handed out')}</th>
            <th>{t('Locks')} {t('Handed in')}</th>
            <th>{t('Keys')} {t('Handed out')}</th>
            <th>{t('Keys')} {t('Handed in')}</th>
            <th>Toilet A</th>
            <th>Toilet B</th>
            <th>{t('Urinal')}</th>
            <th>{t('Areas')}</th>
            <th>{t('Status')}</th>
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
  locksAndKeys: React.PropTypes.object,
  t: React.PropTypes.func.isRequired
}

export default (translate('', [{ wait: true }])(Export))
