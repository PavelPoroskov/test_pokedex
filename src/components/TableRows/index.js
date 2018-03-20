
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableOneRow from '../TableOneRow'

import {selCurrentPageItems, selItemsById} from '../../selectors'
import {arColumns} from '../../constants'

const fnToRow = obj => arColumns.map(col => col.from ? obj[col.from] : '')
const idsToRows = (ids, obj) => ids.map(id => ({
  row: fnToRow(obj[id]),
  id
})
)

class TableRows extends Component {
  render () {
    const { ids, objById } = this.props
    const rows = idsToRows(ids, objById)
    // const rows = this.props.rows
    return rows.map(row => <TableOneRow row={row.row} key={row.id} />)
  }
}

TableRows.propTypes = {
  ids: PropTypes.array.isRequired,
  objById: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ids: selCurrentPageItems(state),
  objById: selItemsById(state)
})

export default connect(mapStateToProps)(TableRows)
