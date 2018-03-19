import {
  SET_FILTER_SUBSTR
} from '../actions/ActionTypes'

const filtersubstr = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER_SUBSTR:
      return action.substr
    default:
      return state
  }
}

export default filtersubstr
