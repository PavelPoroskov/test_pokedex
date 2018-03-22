import React, { Component } from 'react'

import {arColumns} from '../../constants'

class TableHeaderRow extends Component {
  render () {
    console.log('render TableHeaderRow')

    const cells = arColumns.map((cell, ind) => <th key={ind}>{cell.title}</th>)

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}

export default TableHeaderRow
