/* @flow weak */

import {SET_EDITED_ENTRY, SET_EDITED_ENTRY_VALUE} from '../constants'

export function setEditedEntry (editedEntry) {
  return {
    type: SET_EDITED_ENTRY,
    payload: { editedEntry }
  }
}

export function setEditedEntryValue (key, value) {
  return {
    type: SET_EDITED_ENTRY_VALUE,
    payload: { key, value }
  }
}
