/* @flow */

import React from 'react'

import OrderTable from './OrderTable/OrderTable.container'
import {Card, CardText} from 'material-ui/Card'
import s from './OrderOverview.css'

import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
let {pathToJS} = helpers

let keyDownHandler

@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class OrderOverview extends React.Component {
  componentDidMount () {
    keyDownHandler = (ev) => {
      if (ev.which === 27) { // Esc
        this.props.setSelectedOrder() // TODO alert on deselect with unsaved
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    let credentials = {email: 'lak@rfit.dk', password: 'rf1234'} // TODO get from user
    this.props.firebase.login(credentials).then(authResp => {
      this.props.getOrdersAsync()
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', keyDownHandler)
  }

  render () {
    let {selectedEntry} = this.props
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
  firebase: React.PropTypes.object
}
