/* @flow */
import React from 'react'
import s from './OrderTable.css'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import {Field, reduxForm} from 'redux-form'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import ReactPaginate from 'react-paginate'

import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'

import Order from './../order/Order.container'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom} />
)

const HeaderRow = () =>
  <TableRow>
    <TableHeaderColumn tooltip='Order number' style={{'width': 70}}>#</TableHeaderColumn>
    <TableHeaderColumn tooltip='Stand name, number and location'>Stand</TableHeaderColumn>
    <TableHeaderColumn tooltip='Contact details'>Contact</TableHeaderColumn>
    <TableHeaderColumn tooltip='Locks (handed out, returned) and Keys (handed out, returned)'>Management</TableHeaderColumn>
  </TableRow>

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
    let {orders, selectedId, reset, pagination, setPaginationAt, locksAndKeys} = this.props

    orders = orders.map(order => {
      let addedData = locksAndKeys[order._id] ? locksAndKeys[order._id] : {}
      return Object.assign({}, order, addedData)
    })

    let lookupAppendText = pagination.lookup !== '' ? 'that match ' + pagination.lookup : ''
    let clearSearchStyle = pagination.lookup !== '' ? {} : {opacity: '0.1'}
    let resultRangeStyle = pagination.filterCount > 0 ? {} : {display: 'none'}

    let handlePaginationClick = (paginateClickData) => {
      console.log('handlePaginationClick', paginateClickData)
      setPaginationAt(paginateClickData.selected)
    }

    return (
      <Table fixedHeader selectable>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan='3' style={{textAlign: 'center'}}>
              <div className={s.superheader}>
                <div className={s.searchflex}>
                  <SearchIcon />
                  <Field name='lookup' label='Search' component={renderTextField} style={{width: '80%'}} />
                  <CloseIcon label='Clear search entry' onClick={() => reset()} style={clearSearchStyle} />
                </div>
                <div>
                  <Field name='resultCap' floatingLabelText='Results limit' value={pagination.resultCap} component={renderSelectField}>
                    <MenuItem value={10} primaryText='10' />
                    <MenuItem value={25} primaryText='25' />
                    <MenuItem value={50} primaryText='50' />
                    <MenuItem value={100} primaryText='100' />
                    <MenuItem value={10000} primaryText='All' />
                  </Field>
                </div>
              </div>
              <div>
                <ReactPaginate previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={<a href=''>...</a>}
                  breakClassName={'break-me'}
                  pageCount={pagination.count}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={10}
                  forcePage={pagination.at}
                  onPageChange={handlePaginationClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'} />
              </div>
              <div style={resultRangeStyle}>
                Showing {pagination.start} - {pagination.end} of {pagination.filterCount} orders {lookupAppendText}
              </div>
            </TableHeaderColumn>
          </TableRow>
          <HeaderRow />
        </TableHeader>
        <TableBody displayRowCheckbox deselectOnClickaway showRowHover stripedRows>
          {orders.map(order => {
            let is = order._id === selectedId
            return (
              <Order key={order._id} order={order} isSelected={is} />
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

OrderTable.propTypes = {
  orders: React.PropTypes.array,
  selectedId: React.PropTypes.string,
  reset: React.PropTypes.func,
  pagination: React.PropTypes.shape({
    lookup: React.PropTypes.string,
    resultCap: React.PropTypes.number,
    count: React.PropTypes.number,
    at: React.PropTypes.number
  }),
  setSelectedOrder: React.PropTypes.func,
  setPaginationAt: React.PropTypes.func,
  locksAndKeys: React.PropTypes.object
}

export default reduxForm({
  form: 'datafilter' // a unique name for this
})(OrderTable)
