import React, { Component } from 'react'
import { Animate } from 'react-animate-mount'
import { withStyles } from '@material-ui/styles'

const styles = (theme) => ({
  image: {
    height: '242px',
    width: '167px',
    borderRadius: '6px',
    transition: 'opacity 1s ease 0s, filter 0.2s ease 0s',
    '&:hover': {
      'filter': 'blur(4px)',
       opacity: '0.5!important'
    },
  },
  container: {
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: '6px',
    position: 'relative'
  }
})

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
    const { classes } = this.props
    let style = {
      background: `url(${this.state.src})`,
    }
    if (!this.state.loaded) {
      style = { ...style, opacity: 0 }
    } else {
      style = {...style, opacity: 1 }
    }
    if (this.props.getvisability() && this.state.loaded) {
      style = {...style, opacity: 1 }
    } else {
      style = {...style, opacity: 0 }
    }
    
    return (
      <Animate type="fade" show={this.props.getvisability() || this.state.loaded} appear>
        <div className={`${classes.container}`}>
          {this.props.children}
          <div className={`${classes.image}`} style={style}></div>
        </div>
      </Animate>
    )
  }
}

export default withStyles(styles)(LazyBackground)