
import {
  //  NET_TYPES_REQUEST,
  NET_TYPES_SUCCESS,
  NET_TYPES_FAILURE
} from '../actions/ActionTypes'

const types = (state = [], action) => {
  switch (action.type) {
    case NET_TYPES_SUCCESS:
    // debug
      console.log('Types was loaded')
      console.dir(action.list)
      return action.list
    case NET_TYPES_FAILURE:

      console.log('Loading Error')
      return []
    default:
      return state
  }
}

export default types
