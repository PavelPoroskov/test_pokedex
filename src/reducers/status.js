import {
  // CHANGE_FILTER,
  SET_PAGE,
  // NET_ITEMS_SUCCESS_BATCH,
  SELECTION_SUCCES_BATCH,
  SET_ERROR
} from '../actions/ActionTypes'

import {
  STATUS_NOSTATUS,
  STATUS_REQUEST,
  // STATUS_LOADING,
  STATUS_SUCCES,
  STATUS_ERROR
} from '../constants'

const status = (state = STATUS_NOSTATUS, action) => {
  switch (action.type) {
    // case CHANGE_FILTER:
    //   return STATUS_REQUEST
    // case NET_ITEMS_SUCCESS_BATCH:
    //   return action.isLastBatch ? STATUS_SUCCES : STATUS_LOADING
    // case NET_ITEMS_SUCCESS_END:
    //   return STATUS_SUCCES
    case SET_PAGE:
      return STATUS_REQUEST
    case SELECTION_SUCCES_BATCH:
      // console.log('status')
      // console.log(action.items)
      // return action.isFull ? STATUS_SUCCES : STATUS_LOADING
      return action.isFull ? STATUS_SUCCES : state
    case SET_ERROR:
      console.log(action.error)
      return STATUS_ERROR
    default:
      return state
  }
}

export default status
