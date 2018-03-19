import {
  SET_PAGE_SIZE
} from '../actions/ActionTypes'

import { initPageSize } from '../constants'

const pageSize = (state = initPageSize, action) => {
  switch (action.type) {
    case SET_PAGE_SIZE:
      return action.pageSize
    default:
      return state
  }
}

export default pageSize
