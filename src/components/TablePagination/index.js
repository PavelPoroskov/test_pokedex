import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createSelector} from 'reselect'

import { PaginationNumBtnsQuantity } from '../../constants'

import { actSetPage } from '../../actions'

import '../../styles/css/TablePagination.css'

const range = (beg, end) => {
  let arr = []
  let cur = beg
  while (cur <= end) {
    arr.push(cur)
    cur++
  }
  return arr
}

// const unitArr = (arrBeg, arrMid, arrEnd) => {
//   let arr = arrBeg
//   if (arrMid) {
//     arr = arr.concat(arrMid)
//   }
//   if (arrEnd) {
//     arr = arr.concat(arrEnd)
//   }
//   return arr
// }

class TablePagination extends Component {
  constructor (props) {
    super(props)

    // this.state = {value: props.currentPage}

    this.handleClick = this.handleClick.bind(this)
    this.arrangePageNums = this.arrangePageNums.bind(this)
    this.drawArrayBtns = this.drawArrayBtns.bind(this)
  }

  arrangePageNums (currentPage, totalPages, selectionIsFull) {
    //
    let beg = -1
    let end = -1
    if (this.arrBase && this.arrBase.length > 0) {
      beg = this.arrBase[0]
      end = this.arrBase[this.arrBase.length - 1]
    }

    let flagCondChanged = false
    let flagUnToFull = false
    // if (!(totalPages === 1 && currentPage === 1)) {
    if (this.selectionIsFull !== selectionIsFull) {
      flagCondChanged = true
      if (this.selectionIsFull === false && selectionIsFull) {
        flagUnToFull = true
        // console.log('flagUnToFull')
      }
    }
    // }
    this.selectionIsFull = selectionIsFull

    let avalableBtn
    if (!selectionIsFull) {
      avalableBtn = Math.min(PaginationNumBtnsQuantity - 1, totalPages)
    } else {
      avalableBtn = Math.min(PaginationNumBtnsQuantity - 2, totalPages)
      // !selectionIsFull ==> selectionIsFull
      if (flagUnToFull) {
        if (avalableBtn < end - beg + 1) {
          end = beg + avalableBtn - 1
        }
      }
    }
    if (end - beg + 1 < avalableBtn) {
      flagCondChanged = true
    }

    // if (end - beg + 1 === avalableBtn) {
    if (!flagCondChanged) {
      if (beg <= currentPage && currentPage <= end) {
        return this.arrPageNums
      }
      if (selectionIsFull && totalPages - 1 <= currentPage && currentPage <= totalPages) {
        return this.arrPageNums
      }
    }

    if (currentPage < beg) {
      [beg, end] = [currentPage, currentPage + avalableBtn - 1]
    } else { // end < currentPage
      if (currentPage <= avalableBtn) {
        // [beg, end] = [1, beg + avalableBtn - 1]
        [beg, end] = [1, avalableBtn]
      } else {
        if (!flagUnToFull) {
          [beg, end] = [currentPage - avalableBtn + 1, currentPage]
        }
      }
    }

    this.arrBase = range(beg, end)
    let arrRes = this.arrBase.slice()

    if (!selectionIsFull) {
      arrRes.push('...')
    } else {
      if (end < totalPages - 2) {
        arrRes.push('...')
      } else if (end === totalPages - 2) {
        arrRes.push(totalPages - 1)
      }
      // if (currentPage !== totalPages) {
      if (!(flagUnToFull && currentPage === totalPages)) {
        arrRes.push(totalPages)
      }
    }

    return arrRes
  }

  componentWillMount () {
    //
    const {currentPage, totalPages, selectionIsFull} = this.props

    this.arrPageNums = this.arrangePageNums(currentPage, totalPages, selectionIsFull)
  }

  componentWillReceiveProps (nextProps) {
    const {currentPage, totalPages, selectionIsFull} = nextProps

    this.arrPageNums = this.arrangePageNums(currentPage, totalPages, selectionIsFull)
  }
  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.currentPage !== this.props.currentPage) {
  //     return true
  //   }
  //   return false
  // }

  handleClick (num, e) {
    e.preventDefault()
    this.props.onSetPage(num)
  }

  drawArrayBtns (arr) {
    const currentPage = this.props.currentPage

    const fnCls = (num) => {
      if (num === '...') {
        return 'disabled'
      } else if (num === currentPage) {
        return 'active'
      }

      return ''
    }

    const fnClick = (num) => {
      if (num === '...' || num === currentPage) {
        return null
      }

      return this.handleClick.bind(this, num)
    }

    return arr.map((num, ind) => (
      <li className={`page-item ${fnCls(num)}`} key={num}>
        <a className='page-link'
          onClick={fnClick(num)}>{num}
        </a>
      </li>
    ))
  }

  render () {
    // disabled
    const {currentPage, totalPages, selectionIsFull} = this.props
    // console.log('render TablePagination ' + totalPages + ' current ' + currentPage)

    let nextBtn
    if (currentPage < totalPages || !selectionIsFull) {
      nextBtn = (
        <li className='page-item'>
          <a className='page-link'
            onClick={this.handleClick.bind(this, currentPage + 1)}
          >Next</a>
        </li>
      )
    } else {
      nextBtn = (
        <li className='page-item disabled'>
          <span className='page-link'>Next</span>
        </li>
      )
    }

    let prevBtn
    if (currentPage <= 1) {
      prevBtn = (
        <li className='page-item disabled'>
          <span className='page-link'>Previous</span>
        </li>
      )
    } else {
      prevBtn = (
        <li className='page-item'>
          <a className='page-link'
            onClick={this.handleClick.bind(this, currentPage - 1)}
          >Previous</a>
        </li>
      )
    }

    const arrBtns = this.drawArrayBtns(this.arrPageNums)

    return (
      <nav className='TablePagination'>
        <ul className='pagination'>
          {prevBtn}
          {arrBtns}
          {nextBtn}
        </ul>
      </nav>
    )
  }
}

TablePagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired
}

const selPageSize = (state) => state.pageSize
const selSelectionLength = (state) => state.selectionParams.fullLength
const selSelectionIsFull = (state) => state.selectionParams.isFull

const selTotalPages = createSelector(
  [selSelectionLength, selPageSize],
  (total, pageSize) => {
    let rest = total % pageSize
    let pages = (total - rest) / pageSize
    pages = pages + (rest ? 1 : 0)

    return Math.max(1, pages)
  }
)

const selPageNum = (state) => state.pageNum

const mapStateToProps = (state, ownProps) => ({
  currentPage: selPageNum(state),
  totalPages: selTotalPages(state),
  selectionIsFull: selSelectionIsFull(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetPage: (pageNum) => {
    // console.log('want pageNum ' + pageNum)
    dispatch(actSetPage(pageNum))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePagination)
