
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableOneRow from '../TableOneRow'

import {selCurrentPageItems, selItemsById} from '../../selectors'
import {arColumns} from '../../constants'

const ObjToRow = obj => arColumns.map(col => {
  let content = null
  if (col.from) {
    if (col.type === 'image') {
      content = <img src={obj[col.from]} alt={obj['name']} />
    } else if (col.type === 'tags') {
      content = obj[col.from].map((tag, ind) => <div key={ind}>{tag}</div>)
    } else {
      content = obj[col.from]
    }
  }

  return content
})

const idsToRows = (ids, obj) => ids.map(id => ({
  cells: ObjToRow(obj[id]),
  id
}))

class TableRows extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.ids !== this.props.ids)
  }

  render () {
    console.log('render TableRows')

    const { ids, objById } = this.props
    const rows = idsToRows(ids, objById)

    return rows.map(row =>
      <TableOneRow row={row.cells} id={row.id} key={row.id} />)
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
