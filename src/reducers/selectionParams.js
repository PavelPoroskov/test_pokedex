
import {
  CHANGE_FILTER,
  SELECTION_SUCCES_BATCH
} from '../actions/ActionTypes'

const initState = {
  count: 0,
  isFull: true,
  length: 0
}
const selectionParams = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {...initState}
    case SELECTION_SUCCES_BATCH:
      const {length, ...restObj} = action.params
      let newState = {...state, ...restObj}
      newState['length'] = state['length'] + length
      return newState
    default:
      return state
  }
}

export default selectionParams
