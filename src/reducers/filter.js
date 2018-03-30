import {
  CHANGE_FILTER
} from '../actions/ActionTypes'

const initState = {substr: '', type: ''}

const filter = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, ...action.filter }
    default:
      return state
  }
}

export default filter
