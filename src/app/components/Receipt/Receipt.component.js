/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

@firebase([
  ['locksAndKeys']
])
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`)
  })
)
class Receipt extends React.Component {
  render () {
    let {params, orders, locksAndKeys} = this.props // from @firebase
    let receiptId  = params.id
    let type = params.type
    let order = orders.find((o) => o.human_readable_id === parseInt(receiptId))
    if (!order) {
      return <div />
    }
    console.log(locksAndKeys, receiptId, order, orders)
    let now = new Date()
    let lak = locksAndKeys[order._id]
    console.log(lak)
    if (type === 'handedout') {
      return <div>
        <h1>Receipt for keys for toilet locks: Handout</h1>
        <div>
          Stand number: {order.stand_number}
        </div>
        <div>
          Stand name: {order.stand_name}
        </div>
        <div>
          Keys: {lak.keysHandedOut}
        </div>
        <div>
          Date: {now.toLocaleDateString()}
        </div>
        <div>
          Signature
          <hr />
        </div>
        <div>
          Name (capital letter)
          <hr />
        </div>
      </div>
    }
    if (type === 'returned') {
      return <div>
        <h1>Receipt for keys for toilet locks: Return</h1>
        <div>
          Stand number: {order.stand_number}
        </div>
        <div>
          Stand name: {order.stand_name}
        </div>
        <div>
          Keys: {lak.keysReturned}
        </div>
        <div>
          Locks: {lak.locksReturned}
        </div>
        <div>
          Date: {now.toLocaleDateString()}
        </div>
        <div>
          Signature
          <hr />
        </div>
        <div>
          Name (capital letter)
          <hr />
        </div>
      </div>
    }
  }
}

Receipt.propTypes = {
  params: React.PropTypes.object,
  orders: React.PropTypes.array,
  locksAndKeys: React.PropTypes.object
}

export default Receipt
