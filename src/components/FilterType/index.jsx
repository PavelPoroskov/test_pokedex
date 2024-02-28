import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createSelector} from 'reselect'

import { actChangeFilter } from '../../actions'

// import '../../styles/css/FilterType.css'
import './FilterType.styl'

class FilterType extends Component {
  constructor (props) {
    super(props)

    this.state = {value: props.value}

    this.handleSelect = this.handleSelect.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.value !== this.state.value) {
  //     return true
  //   }
  //   return false
  // }

  handleSelect (event) {
    this.setState({value: event.target.value})
    this.props.onSetFilterType(event.target.value)
  }

  handleClear (event) {
    if (this.state.value === '') {
      return
    }
    this.setState({value: ''})
    this.props.onSetFilterType('')
  }

  render () {
    // console.log('render FilterType ' + this.props.value)

    const {types} = this.props

    let values = [{value: '', Name: '- All -'}]
    values = values.concat(types)

    const arComp = values.map(obj => (
      <option value={obj.value} key={obj.value}
        className={`type type-${obj.value}`}>{obj.Name}</option>
    ))

    return (
      <div className='FilterType'>
        <label>Type:</label>
        <select value={this.state.value}
          className={`type type-${this.state.value}`}
          onChange={this.handleSelect}>
          {arComp}
        </select>
        <button className='BtnClear' onClick={this.handleClear}>X</button>
      </div>
    )
  }
}

FilterType.propTypes = {
  types: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onSetFilterType: PropTypes.func.isRequired
}

const capitalizeStr = (s) =>
  s && s[0].toUpperCase() + s.slice(1)

const selTypes = (state) => state.typeList.sort()
const selTypesOpz = createSelector(
  [selTypes],
  (types) => types.map(name => ({value: name, Name: capitalizeStr(name)}))
)

const selFilterType = (state) => {
  if (state.filter && state.filter.type) {
    return state.filter.type
  } else {
    return ''
  }
}

const mapStateToProps = (state, ownProps) => ({
  types: selTypesOpz(state),
  value: selFilterType(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetFilterType: (value) => {
    dispatch(actChangeFilter({type: value}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterType)
