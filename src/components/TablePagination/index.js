import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actSetPage } from '../../actions'
import {selCurrentPageNum, selTotalPages} from '../../selectors'

const range = (beg, end) => {
  let arr = []
  let cur = beg
  while (cur <= end) {
    arr.push(cur)
    cur++
  }
  return arr
}

class TablePagination extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.drawBtns = this.drawBtns.bind(this)
  }

  handleClick (num, e) {
    e.preventDefault()
    this.props.onSetPage(num)
  }

  drawBtns (arrBeg, arrEnd) {
    let arr = arrBeg
    if (arrEnd) {
      arr.push('...')
      arr = arr.concat(arrEnd)
    }

    const currentPage = this.props.currentPage
    const cls = {
      '...': 'disabled',
      [currentPage]: 'active'
    }

    const fnClick = (num) => {
      if (num === '...') {
        return null
      }

      return this.handleClick.bind(this, num)
    }

    return arr.map((num, ind) => (
      <li className={`page-item ${cls[num]}`} key={num}>
        <a className='page-link' href='#'
          onClick={fnClick(num)}>{num}
        </a>
      </li>
    ))
  }

  render () {
    // disabled
    const {currentPage, totalPages} = this.props
    console.log('totalPages ' + totalPages)

    let nextClass
    let nextClick
    if (totalPages <= currentPage) {
      nextClass = 'disabled'
      nextClick = null
    } else {
      nextClass = ''
      nextClick = this.handleClick.bind(this, currentPage + 1)
    }

    let prevClass
    let prevClick
    if (currentPage <= 1) {
      prevClass = 'disabled'
      prevClick = null
    } else {
      prevClass = ''
      prevClick = this.handleClick.bind(this, currentPage - 1)
    }

    const drawButtons = 5
    let arrBtns
    if (totalPages <= drawButtons) {
      // 1, 2, 3, 4, 5
      arrBtns = this.drawBtns(range(1, totalPages))
    } else {
      const avalableBtn = drawButtons - 2 // (last/first)Btn, ...Btn
      if (totalPages - avalableBtn + 1 <= currentPage) {
        // 1, ..., 4, 5, 6
        arrBtns = this.drawBtns([1], range(totalPages - avalableBtn + 1, totalPages))
      } else {
        // if (currentPage <= avalableBtn) {
        // // 1, 2, 3, ..., 6

        // 4, 5, 6, ... 10
        const rest = currentPage % avalableBtn
        const steps = rest || avalableBtn
        const beg = currentPage - steps + 1

        arrBtns = this.drawBtns(range(beg, beg + avalableBtn - 1), [totalPages])
      }
    }

    return (
      <nav >
        <ul className='pagination'>
          <li className={`page-item ${prevClass}`}>
            <a className='page-link' href='#'
              onClick={prevClick}
            >Previous</a>
          </li>
          {arrBtns}
          <li className={`page-item ${nextClass}`}>
            <a className='page-link' href='#'
              onClick={nextClick}
            >Next</a>
          </li>
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

const mapStateToProps = (state, ownProps) => ({
  currentPage: selCurrentPageNum(state),
  totalPages: selTotalPages(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetPage: (pageNum) => {
    dispatch(actSetPage(pageNum))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePagination)
