import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {arColumns} from '../../constants'

class TableOneRow extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.id !== this.props.id)
  }

  drawTypes (ar) {
    let content = null
    if (ar.length === 1) {
      const tag = ar[0]
      content = <a href={`#${tag}`} className={`type type-${tag}`}>{tag}</a>
    } else if (ar.length > 1) {
      let newArr = []
      let newInd = 0
      ar.forEach((tag, ind) => {
        newArr.push(<a href={`#${tag}`} key={newInd} className={`type type-${tag}`}>{tag}</a>)
        newInd++
        if (ind < ar.length - 1) {
          newArr.push(<br key={newInd} />)
          newInd++
        }
      })

      content =
        <React.Fragment>
          {newArr}
        </React.Fragment>
    }

    return content
  }

  objToRow (obj) {
    return arColumns.map(col => {
      let content = null
      if (col.from) {
        if (col.type === 'image') {
          content = <img src={obj[col.from]} alt={obj['name']} />
        } else if (col.type === 'tags') {
          content = this.drawTypes(obj[col.from])
        } else {
          content = obj[col.from]
        }
      }

      return {
        content,
        className: col.className
      }
    })
  }

  render () {
    const obj = this.props.obj
    // const {id, obj} = this.props
    // console.log('render TableOneRow, id: ' + id)
    const row = this.objToRow(obj)

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
  id: PropTypes.string.isRequired,
  obj: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => {
  const pokemon = state.entities.pokemons[props.id]
  return {
    id: props.id,
    obj: pokemon
  }
}

export default connect(mapStateToProps)(TableOneRow)
