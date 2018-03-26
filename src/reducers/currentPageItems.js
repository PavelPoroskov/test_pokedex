import {
  SET_PAGE,
  SET_PAGE_SUCCESS_BATCH
} from '../actions/ActionTypes'

const currentPageItems = (state = [], action) => {
  switch (action.type) {
    case SET_PAGE:
      return []
    case SET_PAGE_SUCCESS_BATCH:
      return [...state, ...action.result]
    default:
      return state
  }
}

export default currentPageItems
