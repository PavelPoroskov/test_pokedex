import {createSelector} from 'reselect'

export const selCurrentSelectedItems = (state) => state.currentSelectedItems

export const selCurrentPageItems = (state) => state.currentPageItems
export const selPageSize = (state) => state.pageSize

export const selCurrentPageNum = (state) => state.pageNum

export const selStatus = (state) => state.status

export const selTotalItems = createSelector(
  [selCurrentSelectedItems],
  (items) => items.length
)

export const selTotalPages = createSelector(
  [selTotalItems, selPageSize],
  (total, pageSize) => {
    let pages = 1
    if (pageSize) {
      let rest = total % pageSize
      pages = (total - rest) / pageSize
      pages = pages + (rest ? 1 : 0)
    } else {
      pages = 1
    }

    return pages
  }
)
