/* @flow */

import React from 'react'
import { reduxForm } from 'redux-form'
import s from './OrderToolbar.css'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

import OrderHandler from './OrderHandler/OrderHandler.component'
import OrderInformation from './OrderInformation/OrderInformation.component'
import ContactInformation from './ContactInformation/ContactInformation.component'

const AllCards = (props) =>
  <div>
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Locks and keys' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderHandler saveOrderData={props.saveOrderData} />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Order information' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderInformation order={props.order} />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Contact information' subtitle={props.order.human_readable_id} actAsExpander showExpandableButton />
        <CardText expandable>
          <ContactInformation order={props.order} />
        </CardText>
      </Card>
    </div>
  </div>

AllCards.propTypes = {
  order: React.PropTypes.object,
  saveOrderData: React.PropTypes.func
}

class OrderToolbar extends React.Component {
  render () {
    let { formPayload } = this.props // from reduxForm
    let { selectedEntry, setSelectedOrder, saveOrderData } = this.props
    let isEmptyObject = (obj) => {
      Object.keys(obj).length === 0 && obj.constructor === Object
    }
    let saveCurrentValues = () => saveOrderData(selectedEntry.uuid, formPayload)
    return <div>
      {selectedEntry &&
        <Drawer width={300} openSecondary open={isEmptyObject(selectedEntry)}>
          <AppBar
            title={'Order #' + selectedEntry.human_readable_id}
            showMenuIconButton={false}
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
            onRightIconButtonTouchTap={() => setSelectedOrder()}
          />
          <div>
            <AllCards order={selectedEntry} saveOrderData={saveCurrentValues} />
          </div>
        </Drawer>
      }
    </div>
  }
}

OrderToolbar.propTypes = {
  selectedEntry: React.PropTypes.object,
  formPayload: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  saveOrderData: React.PropTypes.func
}

// Decorate the form component
export default reduxForm({
  form: 'toolbar', // a unique name for this form
  enableReinitialize: true
})(OrderToolbar)
