/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
import {translate} from 'react-i18next'

import s from './Receipt.css'

@firebase(
  props => ([
    'locksAndKeys/' + (props.order ? props.order._id : '')
  ])
)
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`),
    order: state.orders.entries.find((o) => o.human_readable_id === parseInt(props.params.id))
  })
)
class Receipt extends React.Component {
  render () {
    let {params, order, locksAndKeys, t} = this.props
    let type = params.type
    if (!order) {
      return <div />
    }
    let now = new Date()
    let lakOrder = locksAndKeys[order._id]
    if (type === 'handedout') {
      let keys = ''
      if (lakOrder) {
        keys = lakOrder.keysHandedOut || ''
      }
      return <div className={s.section}>
        <div className={s.receipt}>
          <h2 className={s.header}>{t('Receipt for toilet keys')}: {t('Handed out')}</h2>
          <div>
            <span className={s.left}>{t('Stand ID')}:</span>
            <span className={s.right}>{order.rf_identifier}</span>
          </div>
          <div>
            <span className={s.left}>{t('Stand')}:</span>
            <span className={s.right}>{order.stand_name}</span>
          </div>
          <div>
            <span className={s.left}>{t('Keys')}:</span>
            <span className={s.right}>{keys}</span>
          </div>
          <div>
            <span className={s.left}>{t('Date')}:</span>
            <span className={s.right}>{now.toLocaleDateString()}</span>
          </div>
          <div>
            <span className={s.left}>{t('Signature')}:</span>
            <span className={s.right}>_________________________________________________________________________</span>
          </div>
          <div>
            <span className={s.left}>{t('Name (capital letter)')}:</span>
            <span className={s.right}>_________________________________________________________________________</span>
          </div>
        </div>
      </div>
    }
    if (type === 'returned') {
      let keys = ''
      let locks = ''
      if (lakOrder) {
        keys = lakOrder.keysReturned || ''
        locks = lakOrder.locksHandedOut || ''
      }
      return <div className={s.section}>
        <div className={s.receipt}>
          <h2 className={s.header}>{t('Receipt for toilet keys')}: {t('Handed in')}</h2>
          <div>
            <span className={s.left}>{t('Stand ID')}:</span>
            <span className={s.right}>{order.rf_identifier}</span>
          </div>
          <div>
            <span className={s.left}>{t('Stand')}:</span>
            <span className={s.right}>{order.stand_name}</span>
          </div>
          <div>
            <span className={s.left}>{t('Keys')}:</span>
            <span className={s.right}>{keys}</span>
          </div>
          <div>
            <span className={s.left}>{t('Locks')}:</span>
            <span className={s.right}>{locks}</span>
          </div>
          <div>
            <span className={s.left}>{t('Date')}:</span>
            <span className={s.right}>{now.toLocaleDateString()}</span>
          </div>
          <div>
            <span className={s.left}>{t('Signature')}</span>
            <span className={s.right}>______________________________________________________</span>
          </div>
          <div>
            <span className={s.left}>{t('Name (capital letter)')}:</span>
            <span className={s.right}>______________________________________________________</span>
          </div>
        </div>
      </div>
    }
  }
}

Receipt.propTypes = {
  params: React.PropTypes.object,
  orders: React.PropTypes.array,
  order: React.PropTypes.object,
  locksAndKeys: React.PropTypes.object,
  t: React.PropTypes.func.isRequired
}

export default (translate('', [{ wait: true }])(Receipt))
