/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

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
    let {params, order, locksAndKeys} = this.props
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
          <h2 className={s.header}>Receipt for keys for toilet locks: Handout</h2>
          <div>
            <span className={s.left}>Stand number:</span>
            <span className={s.right}>{order.stand_number}</span>
          </div>
          <div>
            <span className={s.left}>Stand name:</span>
            <span className={s.right}>{order.stand_name}</span>
          </div>
          <div>
            <span className={s.left}>Keys:</span>
            <span className={s.right}>{keys}</span>
          </div>
          <div>
            <span className={s.left}>Date:</span>
            <span className={s.right}>{now.toLocaleDateString()}</span>
          </div>
          <div>
            <span className={s.left}>Signature</span>
            <span className={s.right}>_________________________________________________________________________</span>
          </div>
          <div>
            <span className={s.left}>Name (capital letter)</span>
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
        locks = lakOrder.keysHandedOut || ''
      }
      return <div className={s.section}>
        <div className={s.receipt}>
          <h2 className={s.header}>Receipt for keys for toilet locks: Return</h2>
          <div>
            <span className={s.left}>Stand number:</span>
            <span className={s.right}>{order.stand_number}</span>
          </div>
          <div>
            <span className={s.left}>Stand name:</span>
            <span className={s.right}>{order.stand_name}</span>
          </div>
          <div>
            <span className={s.left}>Keys:</span>
            <span className={s.right}>{keys}</span>
          </div>
          <div>
            <span className={s.left}>Locks:</span>
            <span className={s.right}>{locks}</span>
          </div>
          <div>
            <span className={s.left}>Date:</span>
            <span className={s.right}>{now.toLocaleDateString()}</span>
          </div>
          <div>
            <span className={s.left}>Signature</span>
            <span className={s.right}>_________________________________________________________________________</span>
          </div>
          <div>
            <span className={s.left}>Name (capital letter)</span>
            <span className={s.right}>_________________________________________________________________________</span>
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
  locksAndKeys: React.PropTypes.object
}

export default Receipt