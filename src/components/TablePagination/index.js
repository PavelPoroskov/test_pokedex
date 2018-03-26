import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createSelector} from 'reselect'

import { actSetPage } from '../../actions'

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

    // this.state = {value: props.currentPage}

    this.handleClick = this.handleClick.bind(this)
    this.drawBtns = this.drawBtns.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.totalPages === 0) {
      return false
    }
    return true
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
      if (num === '...' || num === currentPage) {
        return null
      }

      return this.handleClick.bind(this, num)
    }

    return arr.map((num, ind) => (
      <li className={`page-item ${cls[num]}`} key={num}>
        <a className='page-link'
          onClick={fnClick(num)}>{num}
        </a>
      </li>
    ))
  }

  render () {
    // disabled
    const {currentPage, totalPages} = this.props
    console.log('render TablePagination ' + totalPages + ' current ' + currentPage)

    let nextClass
    let nextProps
    if (totalPages <= currentPage) {
      nextClass = 'disabled'
      nextProps = {
        onClick: null,
        href: null
      }
    } else {
      nextClass = ''
      nextProps = {
        onClick: this.handleClick.bind(this, currentPage + 1),
        href: '#'
      }
    }

    let prevClass
    let prevProps
    if (currentPage <= 1) {
      prevClass = 'disabled'
      prevProps = {
        onClick: null,
        href: null
      }
    } else {
      prevClass = ''
      prevProps = {
        onClick: this.handleClick.bind(this, currentPage - 1),
        href: '#'
      }
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
            <a className='page-link' {...prevProps}>Previous</a>
          </li>
          <li className={`page-item ${nextClass}`}>
            <a className='page-link' {...nextProps}>Next</a>
          </li>
          {arrBtns}
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

const selCurrentSelectedItems = (state) => state.currentSelectedItems

const selTotalItems = createSelector(
  [selCurrentSelectedItems],
  (items) => items.length
)

const selTotalPages = createSelector(
  [selTotalItems, selPageSize],
  (total, pageSize) => {
    let pages = 1
    if (pageSize) {
      let rest = total % pageSize
      pages = (total - rest) / pageSize
      pages = pages + (rest ? 1 : 0)
    }

    return pages
  }
)

const selPageNum = (state) => state.pageNum

const mapStateToProps = (state, ownProps) => ({
  currentPage: selPageNum(state),
  totalPages: selTotalPages(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetPage: (pageNum) => {
    // console.log(pageNum)
    dispatch(actSetPage(pageNum))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePagination)
