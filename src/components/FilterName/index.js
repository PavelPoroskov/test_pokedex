import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// import { actFetchPage } from '../../actions'

class FilterName extends Component {
  // constructor (props) {
  //   super(props)

  //   this.handleClick = this.handleClick.bind(this)
  // }

  // // shouldComponentUpdate (nextProps, nextState) {
  // //   return (nextProps.ids !== this.props.ids)
  // // }

  // handleClick (e) {
  //   e.preventDefault()
  //   this.props.onClick()
  // }

  render () {
    // console.log('render TypeLabel ')

    // const tag = this.props.id
    return (
      <div className='FilterName'>
        <label>Name:</label>
        <input type='text' id='FilterName' />
      </div>
    )
  }
}

// FilterType.propTypes = {
//   id: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(actFetchPage({
//       resource: 'type',
//       id: ownProps.id
//     }))
//   }
// })

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: (id) => {
//     dispatch(actFetchPage({
//       resource: 'type',
//       id: id
//     }))
//   }
// })

export default FilterName
