import React, { Component } from 'react'

class LazyBackground extends Component {
  constructor(props) {
    super(props)
    this.state = { src: null }
  }

  componentDidMount() {
    const { src } = this.props

    const imageLoader = new Image()
    imageLoader.src = src

    imageLoader.onload = () => {
      this.setState({ src })
      
      this.props.handleload()
    }
  }

  render() {
    return (
      <div {...this.props} style={this.props.getvisability() ? { opacity: 0.8, backgroundImage: `url(${this.state.src})`} : { opacity: 0.2, backgroundImage: `url(${this.state.src})`}}>
        {this.props.children}
      </div>
    )
  }
}

export default LazyBackground