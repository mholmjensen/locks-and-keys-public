/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import s from './OrderOverview.css'

export default class OrderOverview extends React.Component {
  componentDidMount () {
    this.props.getOrdersAsync()
  }

  render () {
    let { entries, selectedEntry } = this.props
    let selId = selectedEntry ? selectedEntry._id : ''

    return (
      <div className={s.root}>
        <Card>
          <CardHeader title='Ordreoversigt' actAsExpander={false} showExpandableButton={false} />
          <CardText expandable={false}>
            <OrderTable orders={entries} selectedId={selId} />
          </CardText>
        </Card>
      </div>
    )
  }
}

OrderOverview.propTypes = {
  entries: React.PropTypes.array,
  selectedEntry: React.PropTypes.object,
  getOrdersAsync: React.PropTypes.func
}
