/* @flow */

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
