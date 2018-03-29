
import {
  CHANGE_FILTER,
  SELECTION_SUCCES_BATCH
} from '../actions/ActionTypes'

const initState = {
  isFull: false,
  fullLength: 0
}
const selectionParams = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {...initState}
    case SELECTION_SUCCES_BATCH:
      const {isFull, fullLength} = action
      return { isFull, fullLength }
    default:
      return state
  }
}

export default selectionParams
