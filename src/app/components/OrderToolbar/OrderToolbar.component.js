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

@firebase()
class OrderToolbar extends React.Component {
  render () {
    let {selectedEntry, formSaveable, setSelectedOrder, formPayload, firebase} = this.props // from reduxForm and @firebase

    let title = ''
    let hasRemarksOrComments = false
    let hasSelection = selectedEntry !== undefined

    if (hasSelection) {
      title = '#' + selectedEntry.human_readable_id + ' ' + (selectedEntry.stand_number === '' ? '' : '(' + selectedEntry.stand_number + ')')
      hasRemarksOrComments = (selectedEntry.Comment && selectedEntry.Comment.length > 0) || selectedEntry.remarks !== ''
    }

    let onSave = () => firebase.set('locksAndKeys/' + selectedEntry._id, formPayload)
    let closeIcon = <IconButton><NavigationClose /></IconButton>
    return <div>
      {selectedEntry &&
        <div>
          <Drawer width={400} open={hasSelection}>
            <AppBar title={title} showMenuIconButton={false} iconElementRight={closeIcon} onRightIconButtonTouchTap={() => setSelectedOrder()} />
            <div>
              <Card initiallyExpanded>
                <CardHeader title={selectedEntry.stand_name} subtitle={selectedEntry.stand_number} />
                <CardText>
                  <OrderHandler onSave={onSave} formSaveable={formSaveable} orderId={selectedEntry.human_readable_id} />
                </CardText>
              </Card>
            </div>
            <Divider />
            <div>
              <Card initiallyExpanded>
                <CardHeader title={selectedEntry.stand_name} />
                <CardText>
                  <ContactInformation order={selectedEntry} />
                </CardText>
              </Card>
            </div>
          </Drawer>
          <Drawer width={500} openSecondary open={hasRemarksOrComments}>
            <AppBar title={title} showMenuIconButton={false} iconElementRight={closeIcon} onRightIconButtonTouchTap={() => setSelectedOrder()} />
            <div>
              <Card>
                <CardHeader title='Remarks and Comments' subtitle={selectedEntry.Comment && (selectedEntry.Comment.length + ' comments')} />
                <CardText>
                  <OrderComments order={selectedEntry} />
                </CardText>
              </Card>
            </div>
          </Drawer>
        </div>
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
