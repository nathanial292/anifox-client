import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import VizSensor from 'react-visibility-sensor';
import LazyBackground from './LazyBackground'

import Information from './Information'

const styles = theme => ({
  image: {
    height: '242px',
    width: '167px',
  },
  anime: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    height: 'auto',
    width: '167px',
    margin: '5px 5px 5px 5px',
  },
  text: {
    color: 'white',
    position: 'absolute',
    fontSize: '12px',
    zIndex: 1,
    textShadow: '-3px -1px 3px black'
  }
})

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {hasLoaded: false, imgViz: false}
    this.handleLoad = this.handleLoad.bind(this)
    this.getVisability = this.getVisability.bind(this)
  }



  handleClick(malID, e) {
    this.props.handleClick(malID, e)
  }

  handleLoad() {
    this.setState({ hasLoaded: true })
  }

  getVisability() {
    return this.state.imgViz
  }

  render() {
    const { title, picture, malID, key, nbEp, type } = this.props.value
    const { classes } = this.props

    return (
      <VizSensor
        partialVisibility
        onChange={(isVisible) => {
          this.setState({ imgViz: isVisible})
        }}
      >
        <div
          className={`${classes.anime}`}
          onClick={(e) => this.handleClick(malID, e)}
        >
          {this.state.imgViz || this.state.hasLoaded ?
          <div>
            <LazyBackground key={key}
              src={picture}
              handleload={this.handleLoad}
              getvisability={this.getVisability}
            >
              <span className={`${classes.text}`} style={{ top: 0, margin: '25px 0 0 5px'}}>{type}</span>
              <span className={`${classes.text}`} style={{ top: 0, margin: '10px 0 0 5px' }}>{nbEp} Episodes</span>
            </LazyBackground>
            <span className={`${classes.text}`} style={{ position: 'relative', bottom: 0, fontSize: '14px'}}>{title}</span>
          </div>
          : <div className={`${classes.image}`}></div>
          }
          <Information />
        </div>
      </VizSensor>
    )
  }
}

export default withStyles(styles)(Title)
