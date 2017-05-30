/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
import {Link} from 'react-router'
import {translate} from 'react-i18next'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import CsvExporter from './CsvExporter'

@firebase([
  ['locksAndKeys']
])
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`),
    orders: state.orders.entries
  })
)
class HeaderBar extends React.Component {
  render () {
    let {signout, orders, locksAndKeys, t} = this.props

    let csvHeaders = [
      '#',
      t('Stand ID'),
      t('Stand'),
      t('Contact'),
      t('Email'),
      t('Phone'),
      t('Locks') + t('Handed out'),
      t('Locks') + t('Handed in'),
      t('Keys') + t('Handed out'),
      t('Keys') + t('Handed in'),
      'Toilet A',
      'Toilet B',
      t('Urinal'),
      t('Areas'),
      t('Status')
    ]

    let csvData = []

    if (locksAndKeys) {
      csvData = orders.map((order) => {
        let lak = locksAndKeys[order._id] ? locksAndKeys[order._id] : {}
        let findItem = (name) => order['PlumbingItem'].find(i => i.name === name) || {quantity: 0}
        let aQuantity = findItem('Toilet A').quantity
        let bQuantity = findItem('Toilet B').quantity
        let uQuantity = findItem('Urinalsøjle').quantity
        return [
          order.human_readable_id,
          order.rf_identifier,
          order.stand_name,
          order.contact_name,
          order.contact_email,
          order.contact_phone,
          lak.locksHandedOut,
          lak.locksReturned,
          lak.keysHandedOut,
          lak.keysReturned,
          aQuantity,
          bQuantity,
          uQuantity,
          order.people_pro_location,
          order.OrderStatus
        ]
      })
    }

    let now = new Date()
    let downloadName = t('orderexport') + '-' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '.csv'

    csvData.unshift(csvHeaders) // prepend headers
    let exportOrdersAsCsv = (e) => {
      let csvContent = CsvExporter.generateCsvContent(csvData)
      let link = document.createElement('a')
      CsvExporter.createDownloadLink(link, csvContent, 'application/csv', downloadName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    let navElement = <IconButton touch><SettingsIcon style={{'color': '#ec5400'}} /></IconButton>
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <IconMenu iconButtonElement={navElement}>
            <Link to={'export'} target='_blank'>
              <MenuItem primaryText={t('View as Spreadsheet')} />
            </Link>
            <MenuItem primaryText={t('Export (CSV)')} onClick={exportOrdersAsCsv} download={downloadName} />
            <Divider />
            <MenuItem primaryText={t('Sign out')} onClick={signout} />
          </IconMenu>
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={t('Locks and keys') + ' - Roskilde Festival'} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
HeaderBar.propTypes = {
  orders: React.PropTypes.array,
  locksAndKeys: React.PropTypes.object,
  signout: React.PropTypes.func.isRequired,
  t: React.PropTypes.func
}

export default translate('', [{ wait: true }])(HeaderBar)
