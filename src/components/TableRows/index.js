
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  STATUS_REQUEST,
  STATUS_SUCCES,
  STATUS_LOADING,
  STATUS_ERROR,

  arColumns
} from '../../constants'

import TableOneRow from '../TableOneRow'

class TableRows extends Component {
  // shouldComponentUpdate (nextProps, nextState) {
  //   return (nextProps.ids !== this.props.ids)
  // }

  render () {
    const {ids, status} = this.props
    // console.log('render TableRows ' + status)
    // console.log(ids)

    if (ids.length === 0) {
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
          // msg = 'Ok.'
          break
      }
      // console.log(msg)
      return (
        <tr id='Message'>
          <td id='Message' className='Message' align='center'
            colSpan={arColumns.length}>{msg}
          </td>
        </tr>
      )
    }

    // console.log('!!ids')
    // console.log(ids)

    const result = ids.map(id =>
      <TableOneRow id={id} key={id} />)

    if (status === STATUS_ERROR) {
      const msg = 'Error loading. Not all result have been loaded'
      // console.log(msg)
      const msgErr = (
        <tr id='Message' key='Message'>
          <td id='Message' className='Message' align='center'
            colSpan={arColumns.length}>{msg}</td>
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
  ids: state.pageItems,
  status: state.status
})

export default connect(mapStateToProps)(TableRows)
