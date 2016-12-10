/* @flow */
import { UPDATE_ORDER_VALUES, SET_ORDERS, SET_SELECTED_ORDER, SET_PAGINATION_AT } from '../constants'

let ordersInitialState = {
  entries: [],
  selectedEntry: undefined,
  paginationAt: 0
}

export default function orders (state: Object = ordersInitialState, action: Object) {
  switch (action.type) {
    case UPDATE_ORDER_VALUES:
      let entriesUpdated = state.entries.map((v) => Object.assign({}, v)) // TODO instead of deepcopy, update entries using react update immutability helpers i.e. import update from 'react-addons-update'
      let orderAt = state.entries.findIndex((order) => order.uuid === action.payload.uuid)
      if (orderAt > -1 && action.payload.values) {
        entriesUpdated[orderAt] = Object.assign({}, entriesUpdated[orderAt], action.payload.values)
      } else {
        console.log('Error, state unmodified. Trying to', UPDATE_ORDER_VALUES, orderAt, action.payload.values)
      }

      return {
        ...state,
        entries: entriesUpdated
      }

    case SET_ORDERS:
      return {
        ...state,
        entries: action.payload.orders
      }

    case SET_SELECTED_ORDER:
      return {
        ...state,
        selectedEntry: action.payload.order
      }

    case SET_PAGINATION_AT:
      return {
        ...state,
        paginationAt: action.payload.paginationAt
      }

    default:
      return state
  }
}
