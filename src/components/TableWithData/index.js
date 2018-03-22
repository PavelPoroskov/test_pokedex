import React, { Component } from 'react'

// import TableHeaderRow from '../TableHeaderRow'
import TableRows from '../TableRows'

import {arColumns} from '../../constants'

class TableWithData extends Component {
  render () {
    // console.log('render TableWithData')

    const titles = arColumns.map((col, ind) =>
      <th key={ind} className={col.className}>{col.title}</th>)

    return (
      <table>
        <thead>
          <tr>
            {titles}
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
    )
  }
}

export default TableWithData
