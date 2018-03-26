import {
  SET_FILTER,
  // NET_ITEMS_SUCCESS_BATCH,
  // NET_ITEMS_SUCCESS_END,
  SET_ERROR
} from '../actions/ActionTypes'

import {
  STATUS_NOTSTATUS,
  STATUS_REQUEST,
  // STATUS_LOADING,
  // STATUS_SUCCES,
  STATUS_ERROR
} from '../constants'

const status = (state = STATUS_NOTSTATUS, action) => {
  switch (action.type) {
    case SET_FILTER:
      return STATUS_REQUEST
    // case NET_ITEMS_SUCCESS_BATCH:
    //   return action.isLastBatch ? STATUS_SUCCES : STATUS_LOADING
    // case NET_ITEMS_SUCCESS_END:
    //   return STATUS_SUCCES
    case SET_ERROR:
      console.log(action.error)
      return STATUS_ERROR
    default:
      return state
  }
}

export default status
