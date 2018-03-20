import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TableOneRow extends Component {
  render () {
    const row = this.props.row
    // const row = this.props.row

    const cells = row.map((cell, ind) => <td key={ind}>{cell}</td>)

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}

TableOneRow.propTypes = {
  row: PropTypes.array.isRequired
}

export default TableOneRow
