/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import Pagination from 'rc-pagination' // TODO use and use css properly
// import 'rc-pagination/assets/index.css'

import s from './OrderOverview.css'

export default class OrderOverview extends React.Component {
  componentDidMount () {
    this.props.rfgridClientLogin().then(() => this.props.getOrdersAsync())
  }

  render () {
    let { selectedEntry } = this.props
    let selId = selectedEntry ? selectedEntry._id : ''

    return (
      <div className={s.root}>
        <Card>
          <CardHeader title='Orders' subtitle='Showing all orders' actAsExpander={false} showExpandableButton={false} />
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
  getOrdersAsync: React.PropTypes.func,
  rfgridClientLogin: React.PropTypes.func
}
