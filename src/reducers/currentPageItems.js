import {
  SET_CURRENT_PAGE,
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  SET_PAGE_SIZE,
  SET_FILTER_SUBSTR,
  SET_FILTER_TYPES
} from '../actions/ActionTypes'

const currentPageItems = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.currentPageNum
    case NET_ITEMS_SUCCESS_PAGE_FIRST:
    case SET_PAGE_SIZE:
    case SET_FILTER_SUBSTR:
    case SET_FILTER_TYPES:
      return 1
    default:
      return state
  }
}

export default currentPageItems