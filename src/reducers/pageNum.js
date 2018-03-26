import {
  SET_PAGE
} from '../actions/ActionTypes'

const pageNum = (state = 1, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.pageNum
    default:
      return state
  }
}

export default pageNum
