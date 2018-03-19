import {
  SET_FILTER_TYPES
} from '../actions/ActionTypes'

const filtertypes = (state = [], action) => {
  switch (action.type) {
    case SET_FILTER_TYPES:
      return action.substr
    default:
      return state
  }
}

export default filtertypes
