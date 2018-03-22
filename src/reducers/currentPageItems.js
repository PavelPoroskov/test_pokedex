import {
  NET_ITEMS_REQUEST,
  NET_ITEMS_SUCCESS_BATCH
} from '../actions/ActionTypes'

const currentPageItems = (state = [], action) => {
  switch (action.type) {
    case NET_ITEMS_REQUEST:
      return []
    case NET_ITEMS_SUCCESS_BATCH:
      return [...state, ...action.result]
    default:
      return state
  }
}

export default currentPageItems
