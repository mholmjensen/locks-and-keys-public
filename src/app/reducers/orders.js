/* @flow */

import { SET_ORDERS, SET_SELECTED_ORDER } from '../constants'

let ordersInitialState = {
  entries: [],
  selectedEntry: undefined
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

    default:
      return state
  }
}
