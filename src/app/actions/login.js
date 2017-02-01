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
    credentials = null
    .then(successResponse => {
      dispatch(setLoginStatus(''))
    })
    .catch(failResponse => {
      dispatch(setLoginStatus(failResponse.message))
    })
  }
}
