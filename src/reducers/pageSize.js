import {
  SET_PAGE_SIZE
} from '../actions/ActionTypes'

import { initUIPageSize } from '../constants'

const pageSize = (state = initUIPageSize, action) => {
  switch (action.type) {
    case SET_PAGE_SIZE:
      return action.pageSize
    default:
      return state
  }
}

export default pageSize
