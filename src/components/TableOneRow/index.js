import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TableOneRow extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.id !== this.props.id)
  }

  render () {
    const {row, id} = this.props

    console.log('render TableOneRow, id: ' + id)
    const cells = row.map((cell, ind) =>
      <td key={ind} className={cell.className}>{cell.content}</td>)

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}

TableOneRow.propTypes = {
  row: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
}

export default TableOneRow
