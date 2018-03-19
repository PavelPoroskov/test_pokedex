import {
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  NET_ITEMS_SUCCESS_PAGE,
  NET_ITEMS_FAILURE
} from '../actions/ActionTypes'

const items = (state = [], action) => {
  switch (action.type) {
    case NET_ITEMS_SUCCESS_PAGE_FIRST:
    case NET_ITEMS_SUCCESS_PAGE:

      // debug
      // console.log('Pokemons was loaded')
      // console.dir(action.list)
      return [ ...state, ...action.pageItems ]
    case NET_ITEMS_FAILURE:
      // debug
      console.log('Loading Error items')
      return []
    default:
      return state
  }
}

export default items
