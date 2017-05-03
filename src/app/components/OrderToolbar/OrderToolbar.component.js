/* @flow */

import React from 'react'
import {translate} from 'react-i18next'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

import OrderHandler from './OrderHandler/OrderHandler.container'
import OrderComments from './OrderComments/OrderComments.component'
import ContactInformation from './ContactInformation/ContactInformation.component'

class OrderToolbar extends React.Component {
  render () {
    let {selectedEntry, setSelectedOrder, toolbarSaveable, t} = this.props

    let title = ''
    let hasRemarksOrComments = false
    let hasSelection = selectedEntry !== undefined
    let deselectOrder = () => setSelectedOrder()

    if (hasSelection) {
      title = '#' + selectedEntry.human_readable_id + ' ' + (selectedEntry.rf_identifier === '' ? '' : '(' + selectedEntry.rf_identifier + ')')
      hasRemarksOrComments = (selectedEntry.Comment && selectedEntry.Comment.length > 0) || selectedEntry.remarks !== ''
    }

    let closeIcon = <IconButton><NavigationClose /></IconButton>
    return <div>
      {selectedEntry &&
        <div>
          <Drawer width={400} open={hasSelection} docked={!toolbarSaveable}>
            <AppBar title={title} showMenuIconButton={false} iconElementRight={closeIcon} onRightIconButtonTouchTap={deselectOrder} />
            <div>
              <Card initiallyExpanded>
                <CardHeader title={selectedEntry.stand_name} />
                <CardText>
                  <OrderHandler order={selectedEntry} />
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
          <Drawer width={500} openSecondary open={hasRemarksOrComments} docked={!toolbarSaveable}>
            <AppBar title={title} showMenuIconButton={false} iconElementRight={closeIcon} onRightIconButtonTouchTap={deselectOrder} />
            <div>
              <Card>
                <CardHeader title={t('Remarks and Comments')} subtitle={selectedEntry.Comment && (selectedEntry.Comment.length + ' ' + t('comments'))} />
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
  toolbarSaveable: React.PropTypes.bool.isRequired,
  setSelectedOrder: React.PropTypes.func,
  t: React.PropTypes.func
}

export default translate('', [{ wait: true }])(OrderToolbar)
