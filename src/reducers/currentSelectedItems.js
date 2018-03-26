
import {
  SET_FILTER,
  SET_FILTER_END
} from '../actions/ActionTypes'

const currentSelectedItems = (state = [], action) => {
  switch (action.type) {
    case SET_FILTER:
      return []
    // case SET_FILTER_ADD:
    //   return [...state, ...action.items]
    case SET_FILTER_END:
      return action.items
    default:
      return state
  }
}

export default currentSelectedItems
