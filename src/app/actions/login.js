/* @flow */

import {SET_LOGIN_STATUS} from '../constants'

export function setLoginStatus (status) {
  return {
    type: SET_LOGIN_STATUS,
    payload: { status }
  }
}

export function loginChallenge (firebase, credentials) {
  return dispatch => {
    dispatch(setLoginStatus('LOGIN_INIT'))
    firebase.login(credentials)
    .then(successResponse => {
      credentials = null
      dispatch(setLoginStatus(''))
    })
    .catch(failResponse => {
      credentials = null
      dispatch(setLoginStatus(failResponse.message))
    })
  }
}
