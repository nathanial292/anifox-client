import React, { Component } from 'react'
import { Animate } from 'react-animate-mount'

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
      backgroundImage: `url(${this.state.src})`,
      borderRadius: '8px'
    }
    let textStyle = {}
    if (!this.state.loaded) {
      style = { ...style, opacity: 0 }
      textStyle = {...textStyle, opacity: 0}
    } else {
      style = {...style, opacity: 0.5 }
      textStyle = {...textStyle, opacity: 1}
    }
    if (this.props.getvisability() && this.state.loaded) {
      style = {...style, opacity: 0.5 }
      textStyle = {...textStyle, opacity: 1}
    } else {
      style = {...style, opacity: 0 }
      textStyle = {...textStyle, opacity: 0}
    }

    style.transition = `opacity 1s ease 0s`;
    textStyle.transition = `opacity 1s ease 0s`;

    return (
      <Animate type="fade" show={this.props.getvisability() || this.state.loaded} appear>
        <div style={{position: 'relative'}}>
          {React.cloneElement(this.props.children)}
          <div style={{ backgroundColor: 'rgba(0,0,0,1)', borderRadius: '8px' }}>
            <div {...this.props} style={style}></div>
          </div>
        </div>
      </Animate>
    )
  }
}

export default LazyBackground