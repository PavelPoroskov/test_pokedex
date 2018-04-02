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

const unitArr = (arrBeg, arrMid, arrEnd) => {
  let arr = arrBeg
  if (arrMid) {
    arr = arr.concat(arrMid)
  }
  if (arrEnd) {
    arr = arr.concat(arrEnd)
  }
  return arr
}

class TablePagination extends Component {
  constructor (props) {
    super(props)

    // this.state = {value: props.currentPage}

    this.handleClick = this.handleClick.bind(this)
    this.arrangePageNums = this.arrangePageNums.bind(this)
    this.drawArrayBtns = this.drawArrayBtns.bind(this)
  }

  arrangePageNums (currentPage, totalPages, selectionIsFull, isStepPrev) {
    //
    const drawButtons = PaginationNumBtnsQuantity
    let arrBtns
    if (selectionIsFull) {
      //
      if (totalPages <= drawButtons) {
        // 1, 2, 3, 4, 5
        arrBtns = range(1, totalPages)
      } else {
        const avalableBtn = drawButtons - 2 // (last/first)Btn, ...Btn
        if (totalPages - 1 <= currentPage) {
          // 2, 3, 4, 5, 6
          arrBtns = range(totalPages - drawButtons + 1, totalPages)
        } else {
          if (isStepPrev) {
            arrBtns = unitArr(range(currentPage, currentPage + avalableBtn - 1), ['...'], [totalPages])
          } else {
            if (currentPage <= avalableBtn) {
              // 1, 2, 3, ..., 6
              arrBtns = unitArr(range(1, avalableBtn), ['...'], [totalPages])
            } else {
              // 4, 5, 6, ... 10
              arrBtns = unitArr(range(currentPage - avalableBtn + 1, currentPage), ['...'], [totalPages])
            }
          }
        }
      }
    } else { // not selectionIsFull
      //
      if (totalPages < drawButtons) {
        // 1, 2, 3, 4, 5
        arrBtns = unitArr(range(1, totalPages), ['...'])
      } else {
        const avalableBtn = drawButtons - 1 // ...Btn
        if (isStepPrev) {
          arrBtns = unitArr(range(currentPage, currentPage + avalableBtn - 1), ['...'])
        } else {
          if (currentPage <= avalableBtn) {
            arrBtns = unitArr(range(1, avalableBtn), ['...'])
          } else {
            arrBtns = unitArr(range(currentPage - avalableBtn + 1, currentPage), ['...'])
          }
        }
      }
    }

    return arrBtns
  }

  componentWillMount () {
    //
    const {currentPage, totalPages, selectionIsFull} = this.props

    this.arrPageNums = this.arrangePageNums(currentPage, totalPages, selectionIsFull)
  }

  componentWillReceiveProps (nextProps) {
    const nextPageNum = nextProps.currentPage

    const {currentPage, totalPages, selectionIsFull} = nextProps

    let testArr
    if (this.props.totalPages === totalPages &&
    this.props.selectionIsFull === selectionIsFull) {
      testArr = this.arrPageNums
    } else {
      testArr = this.arrangePageNums(this.props.currentPage, totalPages, selectionIsFull)
    }

    const iNext = testArr.indexOf(currentPage)
    const iDots = testArr.indexOf('...')

    let toRearrange = false
    let isStepPrev = false
    if (iNext === -1) {
      toRearrange = true
      isStepPrev = (currentPage + 1 === this.props.currentPage)
    } else if (iDots !== -1) {
      if (iDots === testArr.length - 2 && iNext === testArr.length - 1) {
        toRearrange = true
      }
    }

    if (toRearrange) {
      this.arrPageNums = this.arrangePageNums(nextPageNum, totalPages, selectionIsFull, isStepPrev)
    } else {
      this.arrPageNums = testArr
    }
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
