/* @flow */
import {SET_LOGIN_STATUS} from '../constants'

let loginInitialState = {
  status: ''
}

export default function login (state: Object = loginInitialState, action: Object) {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        status: action.payload.status
      }

    default:
      return state
  }
}
