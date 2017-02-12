/* @flow */
import React from 'react'

import type { CellRendererParams, CellDataGetterParams } from 'react-virtualized/Table/types'

import LockOpen from 'material-ui/svg-icons/action/lock-open'
import VpnKey from 'material-ui/svg-icons/communication/vpn-key'

let iconstyle = {'height': 16, 'width': 16}
let handedOutColor = '#ec5400'

let renderLines = ({cellData = []}): CellRendererParams => (
  <div>
    {
      cellData.map((d, i) => {
        return <div key={i}>{d} <br /></div>
      })
    }
  </div>
)
renderLines.propTypes = {
  cellData: React.PropTypes.array
}
function keysToLines (dataKeys = []) { // Returns function with cellDataGetter signature having dataKeys as context
  return ({columnData, dataKey, rowData}): CellDataGetterParams => dataKeys.map(key => rowData[key])
}
let stand  = {
  cellDataGetter: keysToLines(['stand_name', 'stand_number']),
  cellRenderer: renderLines,
  sorter: (viewSettings) => {
    return (left, right) => {
      let directionFactor = viewSettings.sortDirection === 'ASC' ? 1 : -1
      if (left['stand_name'] === right['stand_name']) {
        return directionFactor * (left['stand_number'] || '').localeCompare((right['stand_number'] || ''))
      }
      return directionFactor * left['stand_name'].localeCompare(right['stand_name'])
    }
  }
}
let contact  = {
  cellDataGetter: keysToLines(['contact_name', 'contact_email', 'contact_phone']),
  cellRenderer: renderLines,
  sorter: (viewSettings) => {
    return (left, right) => {
      let directionFactor = viewSettings.sortDirection === 'ASC' ? 1 : -1
      let lcn = left['contact_name'] || ''
      let rcn = right['contact_name'] || ''
      if (lcn === rcn) {
        return directionFactor * (left['contact_phone'] || '').localeCompare((right['contact_phone'] || ''))
      }
      return directionFactor * lcn.localeCompare(rcn)
    }
  }
}
let ordered = {
  cellRenderer: function ({cellData}): CellRendererParams {
    return cellData.map(item => {
      if (parseInt(item.quantity) > 0) {
        return (
          <span key={item.name} style={{'marginRight': '1.5em'}}>
            {item.quantity} x {item.name}
          </span>
        )
      }
    })
  },
  sorter: (viewSettings) => {
    return (left, right) => {
      let directionFactor = viewSettings.sortDirection === 'ASC' ? 1 : -1
      let leftitem = left.PlumbingItem.find((pi) => pi.quantity > 0)
      let rightitem = right.PlumbingItem.find((pi) => pi.quantity > 0)
      if (!leftitem && !rightitem) {
        return 0
      }
      if (!rightitem) {
        return directionFactor * 1
      }
      if (!leftitem) {
        return directionFactor * -1
      }
      if (leftitem.name === rightitem.name) {
        return directionFactor * (leftitem.quantity - rightitem.quantity)
      }
      return directionFactor * leftitem.name.localeCompare(rightitem.name)
    }
  }
}

let management = {
  cellDataGetter: function ({columnData, dataKey, rowData}): CellDataGetterParams {
    return {
      locksHandedOut: rowData['locksHandedOut'],
      locksReturned: rowData['locksReturned'],
      keysHandedOut: rowData['keysHandedOut'],
      keysReturned: rowData['keysReturned']
    }
  },
  cellRenderer: (cellParams): CellRendererParams => {
    let cellData = cellParams.cellData
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-1'>
            <LockOpen color={handedOutColor} style={iconstyle} /> {cellData.locksHandedOut}
          </div>
          <div className='col-xs-1'>
            <LockOpen style={iconstyle} /> {cellData.locksReturned}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-1'>
            <VpnKey color={handedOutColor} style={iconstyle} /> {cellData.keysHandedOut}
          </div>
          <div className='col-xs-1'>
            <VpnKey style={iconstyle} /> {cellData.keysReturned}
          </div>
        </div>
      </div>
    )
  },
  sorter: (viewSettings) => {
    return (left, right) => {
      let directionFactor = viewSettings.sortDirection === 'ASC' ? 1 : -1
      let llho = left['locksHandedOut'] || ''
      let rlho = right['locksHandedOut'] || ''
      if (llho === rlho) {
        let llr = left['locksReturned'] || ''
        let rlr = right['locksReturned'] || ''
        return directionFactor * llr.localeCompare(rlr)
      }
      return directionFactor * llho.localeCompare(rlho)
    }
  }
}

import ArrowDropAsc from 'material-ui/svg-icons/navigation/arrow-drop-up'
import ArrowDropDesc from 'material-ui/svg-icons/navigation/arrow-drop-down'
import IconButton from 'material-ui/IconButton'

let iconButtonStyle = {
  'padding': '0px',
  'width': '24px',
  'height': '24px'
}

let headerSortRenderer = (headerData) => {
  let SelectedArrow = headerData.sortDirection === 'ASC' ? <ArrowDropDesc color='#ec5400' /> : <ArrowDropAsc color='#ec5400' />
  return (
    <div style={{'display': 'flex'}}>
      <div style={{'flex': '0 1'}}>
        {headerData.label}
      </div>
      <div style={{'flex': '0 1 24px'}}>
        {headerData.dataKey !== headerData.sortBy &&
          <IconButton style={iconButtonStyle}>
            <ArrowDropDesc />
          </IconButton>
        }
        {headerData.dataKey === headerData.sortBy &&
          <IconButton style={iconButtonStyle}>
            {SelectedArrow}
          </IconButton>
        }
      </div>
    </div>
  )
}
headerSortRenderer.propTypes = {
  headerData: React.PropTypes.object
}

let ColumnSetup = {
  stand,
  contact,
  management,
  ordered,
  headerSortRenderer
}

export default ColumnSetup
