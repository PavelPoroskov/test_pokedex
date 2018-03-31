import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import debounce from 'lodash.debounce'

import { actChangeFilter } from '../../actions'

import '../../styles/css/FilterName.css'

class FilterName extends Component {
  constructor (props) {
    super(props)

    this.state = {value: ''}

    this.onChange = this.onChange.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.doSearch = this.doSearch.bind(this)
    this.debouncedSearch = debounce(this.doSearch, 500)
  }

  doSearch () {
    // console.log('doSearch ' + this.state.value)
    this.props.onSetFilterSubStr(this.state.value)
  }
  onChange (event) {
    this.setState({value: event.target.value})
    this.debouncedSearch()
  }

  handleClear (event) {
    if (this.state.value === '') {
      return
    }
    this.setState({value: ''})
    this.debouncedSearch()
  }

  render () {
    // console.log('render FilterName ' + this.state.value)

    return (
      <div className='FilterName'>
        <label>Name: </label>
        <input type='text' value={this.state.value}
          onChange={this.onChange} />
        <button className='BtnClear' onClick={this.handleClear}>X</button>
      </div>
    )
  }
}

FilterName.propTypes = {
  onSetFilterSubStr: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetFilterSubStr: (value) => {
    dispatch(actChangeFilter({substr: value.trim().toLowerCase()}))
  }
})

export default connect(null, mapDispatchToProps)(FilterName)
