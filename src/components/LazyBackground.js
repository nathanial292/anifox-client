import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

class LazyBackground extends Component {
  constructor(props) {
    super(props)
    this.state = { src: null, loaded: false }
  }

  componentDidMount() {
    const { src } = this.props

    const imageLoader = new Image()
    imageLoader.src = src

    imageLoader.onload = () => {
      this.setState({ src, loaded: true })

      this.props.handleload()
    }
  }

  render() {
    let style = {
      backgroundImage: `url(${this.state.src})`
    }
    if (this.state.loaded) {
      style = { ...style, opacity: 0.8 }
    } else {
      style = {...style, opacity: 0}
    }
    if (this.props.getvisability() && this.state.loaded) {
      style = {...style, opacity: 0.8, }
    } else {
      style = {...style, opacity: 0.2}
    }


    style.transition = `opacity 0.5s ease 0s`;

    return (
      <div {...this.props} style={style} >
        {this.props.children}
      </div>
    )
  }
}

export default LazyBackground