import { createSelector } from 'reselect'

// import { pageSize } from './constants'

function includesSubArr (arr, subArr) {
  for (let j = 0; j < subArr.length; j++) {
    if (!arr.includes(subArr[j])) {
      return false
    }
  }

  return true
}

// function intersectsSubArr( arr, subArr ) {

//   for (let j=0; j < subArr.length; j++) {
//     if (arr.includes(subArr[j]) ){
//       return true;
//     }
//   }

//   return false;
// }

const selItems = (state) => state.items
const selItemsById = (state) => state.itemsById

const selFilterTypes = (state) => state.filtertypes
const selFilterSubStr = (state) => state.filtersubstr

const selFilterSubStrLow = createSelector(
  selFilterSubStr,
  substr => {
    if (substr) {
      let str = substr.trim().toLowerCase()
      if (str) {
        return str
      }
    }

    return undefined
  }
)

const selFilteredByTypes = createSelector(
  selItems,
  selItemsById,
  selFilterTypes,
  (items, itemsById, types) => {
    if (!types) {
      return items
    }

    return items.filter(id => includesSubArr(itemsById[id].types, types))
  }
)

const selFilteredBySubStr = createSelector(
  selFilteredByTypes,
  selItemsById,
  selFilterSubStrLow,
  (items, itemsById, substr) => {
    if (!substr) {
      return items
    }

    return items.filter(id => itemsById[id].name.includes(substr))
  }
)

export const selFilteredItems = selFilteredBySubStr

const selRemoteFullSize = (state) => state.remoteFullSize
const selPageSize = (state) => state.pageSize

const selFilteredSize = (state) => createSelector(
  selFilterTypes,
  selFilterSubStrLow,
  selFilteredItems,
  selRemoteFullSize,
  selPageSize,
  (types, substr, items, remoteSize, pageSize) => {
    let size

    if (!types && !substr) {
      size = remoteSize
    } else {
      if (items) {
        size = items.length
      }
    }

    return size || pageSize
  }
)

export const selPagesTotal = (state) => createSelector(
  selFilteredSize,
  selPageSize,
  (sizeAll, pageSize) => {
    let rem = sizeAll % pageSize
    let total = (sizeAll - rem) / pageSize
    if (rem) {
      total++
    }
    return total
  }
)

const selCurrentPageNum = (state) => state.currentPageNum

// pageNum: 1..n
export const selCurrentPageItems = (state) => createSelector(
  selFilteredItems,
  selCurrentPageNum,
  selPageSize,
  (items, pageNum, pageSize) => {
    let begin = (pageNum - 1) * pageSize
    let end = begin + pageSize
    return items.slice(begin, end)
  }
)
