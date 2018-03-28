
import {
  CHANGE_FILTER,
  SELECTION_SUCCES_BATCH
} from '../actions/ActionTypes'

const selectionItems = (state = [], action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return []
    case SELECTION_SUCCES_BATCH:
      return [...state, ...action.items]
    default:
      return state
  }
}

export default selectionItems
