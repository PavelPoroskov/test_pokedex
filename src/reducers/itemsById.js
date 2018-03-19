import {
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  NET_ITEMS_SUCCESS_PAGE,
  NET_ITEMS_FAILURE
} from '../actions/ActionTypes'

const itemsById = (state = {}, action) => {
  switch (action.type) {
    case NET_ITEMS_SUCCESS_PAGE_FIRST:
    case NET_ITEMS_SUCCESS_PAGE:

      console.log('itemsById was loaded')
      console.dir(action.pageItemsById)
      return { ...state, ...action.pageItemsById }
    case NET_ITEMS_FAILURE:

      console.log('Loading Error itemsById: ' + action.error)
      return {}
    default:
      return state
  }
}

export default itemsById
