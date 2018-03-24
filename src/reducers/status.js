import {
  NET_ITEMS_REQUEST,
  NET_ITEMS_SUCCESS_BATCH,
  // NET_ITEMS_SUCCESS_END,
  NET_ITEMS_FAILURE
} from '../actions/ActionTypes'

import {
  STATUS_NOTSTATUS,
  STATUS_REQUEST,
  STATUS_LOADING,
  STATUS_SUCCES,
  STATUS_ERROR
} from '../constants'

const status = (state = STATUS_NOTSTATUS, action) => {
  switch (action.type) {
    case NET_ITEMS_REQUEST:
      return STATUS_REQUEST
    case NET_ITEMS_SUCCESS_BATCH:
      return action.isLastBatch ? STATUS_SUCCES : STATUS_LOADING
    // case NET_ITEMS_SUCCESS_END:
    //   return STATUS_SUCCES
    case NET_ITEMS_FAILURE:
      return STATUS_ERROR
    default:
      return state
  }
}

export default status
