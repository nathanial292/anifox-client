import React, { Component } from 'react'
import { Animate } from 'react-animate-mount'
import { withStyles } from '@material-ui/styles'

const styles = (theme) => ({
  image: {
    height: '242px',
    width: '167px',
    borderRadius: '8px',
    '&:hover': {
      opacity: '0.2!important',
      'webkit-filter': 'blur(4px)', /* Chrome, Safari, Opera */
      'filter': 'blur(4px)',
    },
  },
  container: {
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: '8px'
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
      backgroundImage: `url(${this.state.src})`,
    }
    if (!this.state.loaded) {
      style = { ...style, opacity: 0 }
    } else {
      style = {...style, opacity: 0.7 }
    }
    if (this.props.getvisability() && this.state.loaded) {
      style = {...style, opacity: 0.7 }
    } else {
      style = {...style, opacity: 0 }
    }

    style.transition = `opacity 0.4s ease 0s`;

    return (
      <Animate type="fade" show={this.props.getvisability() || this.state.loaded} appear>
        <div style={{position: 'relative'}}>
          {React.cloneElement(this.props.children)}
          <div className={`${classes.container}`}>
            <div className={`${classes.image}`} style={style}>
              {this.props.children}
            </div>
          </div>
        </div>
      </Animate>
    )
  }
}

export default withStyles(styles)(LazyBackground)