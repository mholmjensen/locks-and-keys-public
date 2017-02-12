/* @flow */
import {SET_ORDERS, SET_SELECTED_ORDER, SET_SORT} from '../constants'

let ordersInitialState = {
  entries: [],
  entriesLoaded: false,
  selectedEntry: undefined,
  sortBy: 'human_readable_id',
  sortDirection: 'ASC'
}

function determineDirection (state, sortBy) {
  if (!sortBy || state.sortBy !== sortBy) { // Non-values or inactive sorting keys point downwards
    return 'ASC'
  }
  return state.sortDirection === 'ASC' ? 'DESC' : 'ASC'
}

export default function orders (state: Object = ordersInitialState, action: Object) {
  switch (action.type) {
    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: determineDirection(state, action.payload.sortBy)
      }

    case SET_ORDERS:
      return {
        ...state,
        entries: action.payload.orders,
        entriesLoaded: true
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
