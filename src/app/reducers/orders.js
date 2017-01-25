/* @flow */
import {SET_ORDERS, SET_SELECTED_ORDER, SET_PAGINATION_AT} from '../constants'

let ordersInitialState = {
  entries: [],
  selectedEntry: undefined,
  paginationAt: 0
}

export default function orders (state: Object = ordersInitialState, action: Object) {
  switch (action.type) {
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
