/* @flow */
import React from 'react'
import s from './OrderTable.css'
require('!style!css!react-virtualized/styles.css')
import {Column, Table, AutoSizer, WindowScroller} from 'react-virtualized'
import type { CellRendererParams, CellDataGetterParams } from 'react-virtualized/Table/types'
import {Field, reduxForm} from 'redux-form'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import VpnKey from 'material-ui/svg-icons/communication/vpn-key'
import Badge from 'material-ui/Badge'

import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

let reduxFormPropTypes = {
  label: React.PropTypes.string,
  input: React.PropTypes.object,
  meta: React.PropTypes.object
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
renderTextField.propTypes = reduxFormPropTypes

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom} />
)
renderSelectField.propTypes = {
  ...reduxFormPropTypes,
  children: React.PropTypes.array
}

let iconstyle = {'height': 16, 'width': 16}
let handedOutColor = '#ec5400'

let renderManagement = ({cellData}): CellRendererParams => {
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
}
renderManagement.propTypes = {
  cellData: React.PropTypes.array
}

let renderOrderedEquipment = ({cellData}): CellRendererParams => {
  return cellData.map(item => {
    if (parseInt(item.quantity) > 0) {
      return (
        <span key={item.name} style={{'marginRight': '1.5em'}}>
          {item.quantity} x {item.name}
        </span>
      )
    }
  })
}
renderOrderedEquipment.propTypes = {
  cellData: React.PropTypes.array
}

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

function dataGetterMagementData ({columnData, dataKey, rowData}): CellDataGetterParams {
  return {
    locksHandedOut: rowData['locksHandedOut'],
    locksReturned: rowData['locksReturned'],
    keysHandedOut: rowData['keysHandedOut'],
    keysReturned: rowData['keysReturned']
  }
}

let {dataToJS} = helpers
@firebase([
  ['locksAndKeys']
])
@connect(
  (state, props) => ({
    locksAndKeys: dataToJS(state.firebase, `locksAndKeys`)
  })
)
class OrderTable extends React.Component {
  render () {
    let {orders, reset, viewSettings, setSelectedOrder, locksAndKeys} = this.props
    orders = orders.map(order => {
      let addedData = {}
      if (locksAndKeys) {
        addedData = locksAndKeys[order._id] ? locksAndKeys[order._id] : {}
      }
      return Object.assign({}, order, addedData)
    })

    let clearSearchStyle = viewSettings.lookup !== '' ? {} : {opacity: '0.1'}

    let w1 = 1
    let w2 = 3
    return (
      <div>
        <div className={s.superheader}>
          <div className={s.searchflex}>
            <Badge badgeContent={orders.length} badgeStyle={{top: 0, right: 12, color: '#ec5400'}}>
              <SearchIcon />
            </Badge>
            <Field name='lookup' label='Search' component={renderTextField} style={{width: '80%'}} />
            <CloseIcon label='Clear search entry' onClick={() => reset()} style={clearSearchStyle} />
          </div>
        </div>
        <div className={s.searchflex}>
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => {
              let se = window.document.getElementById('orderOverviewRoot') // See docs, not working fully as I'd like it
              return (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <Table autoHeight height={height} width={width} headerHeight={30} rowHeight={70}
                      rowCount={orders.length}
                      rowGetter={({ index }) => orders[index]}
                      scrollTop={scrollTop}
                      onRowClick={({index}) => { setSelectedOrder(orders[index]) }}
                      overscanRowCount={40}
                      scrollElement={se}
                      rowStyle={{'alignItems': 'baseline'}} >
                      <Column dataKey='human_readable_id' label='#' tooltip='Order number' width={w1} flexGrow={0.2} />
                      <Column dataKey='StandMeta' label='Stand' tooltip='Stand name, number' cellDataGetter={keysToLines(['stand_name', 'stand_number'])} cellRenderer={renderLines} flexGrow={1} width={w2} />
                      <Column dataKey='ContactMeta' label='Contact' tooltip='Contact details' cellDataGetter={keysToLines(['contact_name', 'contact_email', 'contact_phone'])} cellRenderer={renderLines} flexGrow={1.5} width={w2} />
                      <Column dataKey='people_pro_location' label='Areas' tooltip='Areas people pro' flexGrow={1.5} width={w2} />
                      <Column dataKey='PlumbingItem' label='Ordered' tooltip='A for Toilet A, B for Toilet B, U for Urinals. Prefix signify quantity ordered.' cellRenderer={renderOrderedEquipment} width={w2} flexGrow={1} />
                      <Column dataKey='OrderStatus' label='Status' tooltip='Status is either locked or draft' width={w2} flexGrow={1} />
                      <Column dataKey='ManagementMeta' label='Management' tooltip='Locks (handed out, returned) and Keys (handed out, returned)' cellDataGetter={dataGetterMagementData} cellRenderer={renderManagement} width={w2} flexGrow={1.5} />
                    </Table>
                  )}
                </AutoSizer>
              )
            }}
          </WindowScroller>
        </div>
      </div>
    )
  }
}

OrderTable.propTypes = {
  orders: React.PropTypes.array,
  reset: React.PropTypes.func,
  viewSettings: React.PropTypes.shape({
    lookup: React.PropTypes.string,
    totalOrderCount: React.PropTypes.number
  }),
  setSelectedOrder: React.PropTypes.func,
  setPaginationAt: React.PropTypes.func,
  locksAndKeys: React.PropTypes.object
}

export default reduxForm({
  form: 'datafilter' // a unique name for this
})(OrderTable)
