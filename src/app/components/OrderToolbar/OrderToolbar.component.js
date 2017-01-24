/* @flow */

import React from 'react'
import {reduxForm} from 'redux-form'
import {firebase} from 'redux-react-firebase'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

import OrderHandler from './OrderHandler/OrderHandler.component'
import OrderComments from './OrderComments/OrderComments.component'
import ContactInformation from './ContactInformation/ContactInformation.component'

const AllCards = ({order, onSave, formSaveable}) =>
  <div>
    <div>
      <Card initiallyExpanded>
        <CardHeader title={order.stand_name} subtitle={order.stand_number} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderHandler onSave={onSave} formSaveable={formSaveable} />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title={order.stand_name} actAsExpander showExpandableButton />
        <CardText expandable>
          <ContactInformation order={order} />
        </CardText>
      </Card>
    </div>
    <Divider />
    <div>
      <Card initiallyExpanded>
        <CardHeader title='Remarks and Comments' subtitle={order.Comment && (order.Comment.length + ' comments')} actAsExpander showExpandableButton />
        <CardText expandable>
          <OrderComments order={order} />
        </CardText>
      </Card>
    </div>
  </div>

AllCards.propTypes = {
  order: React.PropTypes.object,
  onSave: React.PropTypes.func,
  formSaveable: React.PropTypes.bool
}

@firebase()
class OrderToolbar extends React.Component {
  render () {
    let {formPayload, firebase} = this.props // from reduxForm and @firebase
    let {selectedEntry, formSaveable, setSelectedOrder} = this.props
    let title = ''
    if (selectedEntry) {
      title = '#' + selectedEntry.human_readable_id + ' ' + (selectedEntry.stand_number === '' ? '' : '(' + selectedEntry.stand_number + ')')
    }
    let isEmptyObject = (obj) => {
      Object.keys(obj).length === 0 && obj.constructor === Object
    }

    let onSave = () => firebase.set('locksAndKeys/' + selectedEntry._id, formPayload)
    return <div>
      {selectedEntry &&
        <Drawer width={500} openSecondary open={isEmptyObject(selectedEntry)}>
          <AppBar
            title={title}
            showMenuIconButton={false}
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
            onRightIconButtonTouchTap={() => setSelectedOrder()}
          />
          <div>
            <AllCards order={selectedEntry} onSave={onSave} formSaveable={formSaveable} />
          </div>
        </Drawer>
      }
    </div>
  }
}

OrderToolbar.propTypes = {
  selectedEntry: React.PropTypes.object,
  formPayload: React.PropTypes.object,
  firebase: React.PropTypes.object,
  setSelectedOrder: React.PropTypes.func,
  formSaveable: React.PropTypes.bool
}

// Decorate the form component
export default reduxForm({
  form: 'toolbar', // a unique name for this form
  enableReinitialize: true
})(OrderToolbar)
