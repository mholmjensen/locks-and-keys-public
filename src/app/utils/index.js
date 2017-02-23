export const SET_ORDERS = 'SET_ORDERS'
export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER'
export const SET_ORDERS_LOADED = 'SET_ORDERS_LOADED'
export const SET_SORT = 'SET_SORT'

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'

let objectsDiffer = (a, b) => {
  for (let k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (a[k] !== b[k]) {
      return true
    }
  }
  return false
}

let toolbarSaveable = function (toolbarForm) {
  if (toolbarForm) {
    return objectsDiffer(toolbarForm.initial, toolbarForm.values)
  }
  return false
}

let lakutil = {
  toolbarSaveable
}
export default lakutil
