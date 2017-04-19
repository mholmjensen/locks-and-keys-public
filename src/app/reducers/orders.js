/* @flow */
import {SET_ORDERS, SET_SELECTED_ORDER, SET_ORDERS_LOADED, SET_SORT, SET_INFO_MESSAGE} from '../constants'

let ordersInitialState = {
  entries: [],
  entriesLoaded: false,
  selectedEntry: undefined,
  sortBy: 'human_readable_id',
  sortDirection: 'ASC',
  infoMessage: '',
  infoDuration: 0
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

    case SET_ORDERS_LOADED:
      return {
        ...state,
        entriesLoaded: action.payload.ordersLoaded
      }

    case SET_INFO_MESSAGE:
      return {
        ...state,
        infoMessage: action.payload.message,
        infoDuration: action.payload.duration
      }

    default:
      return state
  }
}
