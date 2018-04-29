import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {arColumns} from '../../constants'

import TypeLabel from '../TypeLabel'

// import '../../styles/css/TableOneRow.css'
import './TableOneRow.styl'

class TableOneRow extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.id !== this.props.id)
  }

  drawTypes (ar) {
    let content = null
    if (ar.length === 1) {
      const tag = ar[0]
      content = <TypeLabel id={tag} />
    } else if (ar.length > 1) {
      let newArr = []
      let newInd = 0
      ar.forEach((tag, ind) => {
        newArr.push(<TypeLabel id={tag} key={newInd} />)
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

  objToRow (name, obj) {
    return arColumns.map(col => {
      let content = null

      if (col.from) {
        if (col.from === 'Name') {
          return {
            content: obj ? obj[col.from] : name,
            className: col.className
          }
        }

        if (!obj || !obj[col.from]) {
          return {
            content,
            className: col.className
          }
        }

        if (col.type === 'image') {
          content = <img src={obj[col.from]} alt={name} />
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
    const {id: name, obj} = this.props
    // const {id, obj} = this.props
    // console.log('render TableOneRow, id: ' + id)
    const row = this.objToRow(name, obj)

    const cells = row.map((cell, ind) =>
      <td key={ind} className={cell.className}>{cell.content}</td>)

    return (
      <tr className='TableOneRow'>
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
