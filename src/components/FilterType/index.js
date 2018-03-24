import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// import { actFetchPage } from '../../actions'

class FilterType extends Component {
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
      <div className='FilterType'>
        <label>Type:</label>
        <select id='FilterType'>
          <option value=''>- All -</option>
          <option value='normal'>Normal</option>
        </select>
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

export default FilterType
