import {
  SET_TYPELIST
} from '../actions/ActionTypes'

const typeList = (state = [], action) => {
  switch (action.type) {
    case SET_TYPELIST:
      return action.items
    default:
      return state
  }
}

export default typeList
