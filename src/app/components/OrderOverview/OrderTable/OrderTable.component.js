/* @flow */
import React from 'react'
import s from './OrderTable.css'
require('!style!css!react-virtualized/styles.css')
import {Column, Table, AutoSizer, WindowScroller} from 'react-virtualized'
import {Field, reduxForm, formValueSelector} from 'redux-form'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
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

import ColumnSetup from './ColumnSetup'

let CS = ColumnSetup

let isString = (possibleStr) => typeof possibleStr === 'string' || possibleStr instanceof String
// returns true: if a) @obj is a substring of @string; or b) obj has a property for which a) or b) holds
function recurseForString (obj, string) {
  if (!obj) return false
  if (string === '') return true // early out

  if (isString(obj)) { // LHS does not hold for e.g. "str"
    return obj.toLowerCase().includes(string.toLowerCase())
  } else if (obj instanceof Object) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (recurseForString(obj[key], string)) {
          return true
        }
      }
    }
  }
  return false
}

function defaultSorter (viewSettings) {
  return function defaultSorter (a, b) {
    let directionFactor = viewSettings.sortDirection === 'ASC' ? 1 : -1
    let left = a[viewSettings.sortBy] || ''
    let right = b[viewSettings.sortBy] || ''
    let comparison = 0
    if (Number.isInteger(left) && Number.isInteger(right)) {
      comparison = left - right
    } else if (isString(left) && isString(right)) {
      comparison = left.localeCompare(right)
    }
    return directionFactor * comparison
  }
}

function sorterFromKey (viewSettings) {
  let sorter = defaultSorter(viewSettings)
  if (viewSettings.sortBy === 'StandMeta') {
    sorter = CS.stand.sorter(viewSettings)
  } else if (viewSettings.sortBy === 'ContactMeta') {
    sorter = CS.contact.sorter(viewSettings)
  } else if (viewSettings.sortBy === 'PlumbingItem') {
    sorter = CS.ordered.sorter(viewSettings)
  } else if (viewSettings.sortBy === 'ManagementMeta') {
    sorter = CS.management.sorter(viewSettings)
  }
  return sorter
}

const selector = formValueSelector('datafilter')
let {dataToJS} = helpers
@firebase([
  ['locksAndKeys']
])
@connect(
  (state, props) => ({
    ordersFromSettings: (viewSettings) => {
      let lookup = selector(state, 'lookup') || ''
      let locksAndKeys = dataToJS(state.firebase, 'locksAndKeys')
      let merged = state.orders.entries || []
      merged = merged.map(order => {
        let addedData = {}
        if (locksAndKeys) {
          addedData = locksAndKeys[order._id] ? locksAndKeys[order._id] : {}
        }
        return Object.assign({}, order, addedData)
      })

      let filtered = merged.filter((o) => recurseForString(o, lookup))

      let sorter = sorterFromKey(viewSettings)
      return filtered.sort(sorter)
    },
    lookup: selector(state, 'lookup') || ''
  })
)
class OrderTable extends React.Component {
  render () {
    let w1 = 1
    let w2 = 3
    let {reset, viewSettings, setSelectedOrder, setSort, ordersFromSettings, toolbarSaveable, lookup} = this.props
    let orders = ordersFromSettings(viewSettings)
    let rowClick = ({index}) => {
      if (!toolbarSaveable) {
        setSelectedOrder(orders[index])
      }
    }

    let clearSearchStyle = lookup !== '' ? {} : {opacity: '0.1'}
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
                    <Table autoHeight height={height} width={width} headerHeight={40} rowHeight={70} overscanRowCount={40}
                      sort={({ sortBy }) => setSort(sortBy)} sortBy={viewSettings.sortBy} sortDirection={viewSettings.sortDirection}
                      rowCount={orders.length}
                      rowGetter={({ index }) => orders[index]}
                      onRowClick={rowClick}
                      scrollTop={scrollTop} scrollElement={se}
                      rowStyle={{'alignItems': 'baseline'}} >
                      <Column dataKey='human_readable_id' label='#' tooltip='Order number' width={w1} flexGrow={0.4}
                        headerRenderer={CS.headerSortRenderer} />
                      <Column dataKey='StandMeta' label='Stand' flexGrow={1} width={w2}
                        headerRenderer={CS.headerSortRenderer} cellDataGetter={CS.stand.cellDataGetter} cellRenderer={CS.stand.cellRenderer} />
                      <Column dataKey='ContactMeta' label='Contact' flexGrow={1.5} width={w2}
                        headerRenderer={CS.headerSortRenderer} cellDataGetter={CS.contact.cellDataGetter} cellRenderer={CS.contact.cellRenderer} />
                      <Column dataKey='people_pro_location' label='Areas' flexGrow={1.5} width={w2}
                        headerRenderer={CS.headerSortRenderer} />
                      <Column dataKey='PlumbingItem' label='Ordered' width={w2} flexGrow={1}
                        headerRenderer={CS.headerSortRenderer} cellRenderer={CS.ordered.cellRenderer} />
                      <Column dataKey='OrderStatus' label='Status' width={w2} flexGrow={1}
                        headerRenderer={CS.headerSortRenderer} />
                      <Column dataKey='ManagementMeta' label='Management' width={w2} flexGrow={1.5}
                        headerRenderer={CS.headerSortRenderer} cellDataGetter={CS.management.cellDataGetter} cellRenderer={CS.management.cellRenderer} />
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
  reset: React.PropTypes.func,
  viewSettings: React.PropTypes.shape({
    sortBy: React.PropTypes.string,
    sortDirection: React.PropTypes.string
  }),
  setSelectedOrder: React.PropTypes.func,
  setSort: React.PropTypes.func,
  ordersFromSettings: React.PropTypes.func,
  toolbarSaveable: React.PropTypes.bool.isRequired,
  lookup: React.PropTypes.string
}

export default reduxForm({
  form: 'datafilter' // a unique name for this
})(OrderTable)
