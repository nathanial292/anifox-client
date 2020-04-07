import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  image: {
    height: '242px',
    width: '167px'
  },
  anime: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    height: 'auto',
    width: '167px',
    margin: '0px 2px 0px 2px'
  }
})

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false}
  }
  handleClick(malID, e) {
    this.props.handleClick(malID, e)
  }

  render() {
    const { title, picture, malID, key } = this.props.value
    const { classes } = this.props
    return (
      <div
        className={`${classes.anime}`}
        key={key}
        onClick={(e) => this.handleClick(malID, e)}>
        <img src={picture} className={`${classes.image}`} onLoad={() => this.setState({ loaded: true })} />
        {this.state.loaded ? <span>{title}</span> : null}
      </div>
    )
  }
}

export default withStyles(styles)(Title)