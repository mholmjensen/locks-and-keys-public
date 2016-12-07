export function statusCheck (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else if (response.status === 401 || response.status === 404) {
    return Promise.reject()
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export function jsonParse (response) {
  return response.json()
}

export function requestFailed (error) {
  if (error) {
    console.log('Error, request to backend failed', error)
  }
}
