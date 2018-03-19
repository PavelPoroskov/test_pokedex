
import {
  NET_ITEMS_SUCCESS_PAGE_FIRST
} from '../actions/ActionTypes'

const remoteFullSize = (state = 0, action) => {
  switch (action.type) {
    case NET_ITEMS_SUCCESS_PAGE_FIRST:
      return action.remoteFullSize
    default:
      return state
  }
}

export default remoteFullSize
