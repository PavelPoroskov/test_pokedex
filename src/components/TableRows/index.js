
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  STATUS_REQUEST,
  STATUS_SUCCES,
  STATUS_LOADING,
  STATUS_ERROR
} from '../../constants'

import TableOneRow from '../TableOneRow'

import {selCurrentPageItems, selStatus} from '../../selectors'

class TableRows extends Component {
  // shouldComponentUpdate (nextProps, nextState) {
  //   return (nextProps.ids !== this.props.ids)
  // }

  render () {
    // console.log('render TableRows')

    const {ids, status} = this.props

    if (!ids) {
      let msg
      switch (status) {
        case STATUS_REQUEST:
        case STATUS_LOADING:
          msg = 'Loading...'
          break
        case STATUS_SUCCES:
          msg = 'Empty result for this filter.'
          break
        case STATUS_ERROR:
          msg = 'Error loading.'
          break
        default:
          msg = 'Choose your weapon.'
          break
      }

      return (
        <tr id='Message'>
          <td id='Message' className='Message'>{msg}</td>
        </tr>
      )
    }

    const result = ids.map(id =>
      <TableOneRow id={id} key={id} />)

    if (status === STATUS_ERROR) {
      const msg = 'Error loading. Not all result have been loaded'
      const msgErr = (
        <tr id='Message' key='Message'>
          <td id='Message' className='Message'>{msg}</td>
        </tr>
      )
      result.push(msgErr)
    }

    return result
  }
}

TableRows.propTypes = {
  ids: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ids: selCurrentPageItems(state),
  status: selStatus(state)
})

export default connect(mapStateToProps)(TableRows)
