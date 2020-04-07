import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import VizSensor from 'react-visibility-sensor';

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
    this.state = {hasLoaded: false, imgViz: false}
  }
  handleClick(malID, e) {
    this.props.handleClick(malID, e)
  }

  render() {
    const { title, picture, malID, key } = this.props.value
    const { classes } = this.props
    return (
      <VizSensor
        partialVisibility
        onChange={(isVisible) => {
          this.setState({ imgViz: isVisible})
        }}
      >

        <div
          key={key}
          className={`${classes.anime}`}
          onClick={(e) => this.handleClick(malID, e)}
        >
          {this.state.imgViz || this.state.hasLoaded ?
            <img src={picture} className={`${classes.image}`} onLoad={() => this.setState({ hasLoaded: true })} />
          : 
            <div className={`${classes.image}`} style={{ backgroundColor: 'rgba(50,250,50,1)'}}></div>
          }
          <span>{title}</span>
        </div>
      </VizSensor>
    )
  }
}

export default withStyles(styles)(Title)