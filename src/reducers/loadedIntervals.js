import {
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  NET_ITEMS_SUCCESS_PAGE
} from '../actions/ActionTypes'

const loadedIntervals = (state = [], action) => {
  switch (action.type) {
    case NET_ITEMS_SUCCESS_PAGE_FIRST:
    case NET_ITEMS_SUCCESS_PAGE:
      // console.log('loadedIntervals: ' + action.first + ' - ' + action.last)

      let intervals = [ ...state, [action.first, (action.last)] ]
      intervals = intervals.sort((intA, intB) => intA[0] - intB[0])

      let newIntervals = []
      if (intervals.length > 1) {
        let prevInt = intervals[0]
        for (let i = 1; i < intervals.length; i++) {
          let curInt = intervals[i]

          let beg = Math.max(prevInt[0], curInt[0])
          let end = Math.min(prevInt[1], curInt[1])
          // let end = Math.min(prevInt[1] + 1, curInt[1])

          if (beg <= end || (prevInt[1] + 1 === curInt[0])) {
            // intersect, unit intervals
            prevInt[1] = curInt[1]
            // if (i === intervals.length - 1) {
            //   newIntervals.push([prevInt[0], prevInt[1]])
            // }
          } else {
            // not intersect
            // console.log('loadedIntervals add1: ' + prevInt[0] + ' - ' + prevInt[1])
            newIntervals.push([prevInt[0], prevInt[1]])
            // if (i === intervals.length - 1) {
            //   newIntervals.push([curInt[0], curInt[1]])
            // }
            prevInt = curInt
          }
        }
        // console.log('loadedIntervals add2: ' + prevInt[0] + ' - ' + prevInt[1])
        newIntervals.push([prevInt[0], prevInt[1]])
      } else {
        newIntervals = intervals
      }

      // if (newIntervals.length > 0) {
      //   console.log(newIntervals[newIntervals.length - 1])
      // }
      return newIntervals
    default:
      return state
  }
}

export default loadedIntervals
