/* @flow */
import update from 'react-addons-update'

import { SET_EDITED_ENTRY, SET_EDITED_ENTRY_VALUE } from '../constants'

let toolbarInitialState = {
  editedEntry: undefined
}

export default function toolbar (state: Object = toolbarInitialState, action: Object) {
  switch (action.type) {
    case SET_EDITED_ENTRY:
      return {
        ...state,
        editedEntry: action.payload.editedEntry
      }

    case SET_EDITED_ENTRY_VALUE:
      if (!state.editedEntry) {
        return state
      }
      if (!state.editedEntry[action.payload.key]) {
        console.error('Key not found in editedEntry, state unmodified', action.payload.key)
        return state
      }
      let updatedEntry = update(state.editedEntry, {'$action.payload.key': {$set: action.payload.value}})
      return {
        ...state,
        editedEntry: updatedEntry
      }

    default:
      return state
  }
}
