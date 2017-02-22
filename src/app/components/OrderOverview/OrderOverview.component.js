/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import CircularProgress from 'material-ui/CircularProgress'
import s from './OrderOverview.css'

let keyDownHandler

export default class OrderOverview extends React.Component {
  componentDidMount () {
    keyDownHandler = (ev) => {
      if (ev.which === 27) { // Esc
        this.props.setSelectedOrder() // TODO save modal on deselect with unsaved using formSaveable
      }
    }
    document.addEventListener('keydown', keyDownHandler)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', keyDownHandler)
  }

  render () {
    let {selectedEntry, entriesLoaded} = this.props
    let selId = selectedEntry ? selectedEntry._id : ''
    return (
      <div className={s.root} id='orderOverviewRoot'>
        {!entriesLoaded &&
          <div className={s.progress}>
            <CircularProgress size={140} />
          </div>
        }
        {entriesLoaded && <OrderTable selectedId={selId} />}
      </div>
    )
  }
}

OrderOverview.propTypes = {
  entriesLoaded: React.PropTypes.bool,
  selectedEntry: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  orders: React.PropTypes.array
}
