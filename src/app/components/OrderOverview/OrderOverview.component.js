/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import {Card, CardText} from 'material-ui/Card'
import s from './OrderOverview.css'

let keyDownHandler

export default class OrderOverview extends React.Component {
  componentDidMount () {
    keyDownHandler = (ev) => {
      if (ev.which === 27) { // Esc
        this.props.setSelectedOrder()
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    this.props.rfgridClientLogin()
    .then(() => this.props.getOrdersAsync())
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', keyDownHandler)
  }

  render () {
    let { selectedEntry } = this.props
    let selId = selectedEntry ? selectedEntry._id : ''

    return (
      <div className={s.root}>
        <Card>
          <CardText expandable={false}>
            <OrderTable selectedId={selId} />
          </CardText>
        </Card>
      </div>
    )
  }
}

OrderOverview.propTypes = {
  selectedEntry: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  getOrdersAsync: React.PropTypes.func,
  rfgridClientLogin: React.PropTypes.func
}
