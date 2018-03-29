import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import debounce from 'lodash.debounce'

import { actChangeFilter } from '../../actions'

class FilterName extends Component {
  constructor (props) {
    super(props)

    this.state = {value: ''}

    this.onChange = this.onChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  onChange (event) {
    this.setState({value: event.target.value})
    debounce(this.props.onSetFilterSubStr, 1000)(event.target.value)
    // this.props.onSetFilterSubStr(event.target.value)
  }

  handleClear (event) {
    if (this.state.value === '') {
      return
    }
    this.setState({value: ''})
    this.props.onSetFilterSubStr('')
  }

  render () {
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
