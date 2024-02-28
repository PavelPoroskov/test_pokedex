import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actChangeFilter } from '../../actions'

// import '../../styles/css/TypeLabel.css'
import './TypeLabel.styl'

class TypeLabel extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return (nextProps.ids !== this.props.ids)
  // }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick()
  }

  render () {
    // console.log('render TypeLabel ')

    const tag = this.props.id
    return (
      <a className={`TypeLabel type type-${tag}`}
        onClick={this.handleClick}>
        {tag}
      </a>
    )
  }
}

TypeLabel.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(actChangeFilter({
      type: ownProps.id
    }))
  }
})

export default connect(null, mapDispatchToProps)(TypeLabel)
