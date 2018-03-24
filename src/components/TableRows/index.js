
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableOneRow from '../TableOneRow'

import {selCurrentPageItems} from '../../selectors'

class TableRows extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.ids !== this.props.ids)
  }

  render () {
    // console.log('render TableRows')

    const ids = this.props.ids
    if (!ids) {
      return (
        <tr id='Loading'>
          <td id='Loading' className='Loading'>Loading...</td>
        </tr>
      )
    }

    return ids.map(id =>
      <TableOneRow id={id} key={id} />)
  }
}

TableRows.propTypes = {
  ids: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ids: selCurrentPageItems(state)
})

export default connect(mapStateToProps)(TableRows)
