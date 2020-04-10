import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = theme => ({
  root: {
    position: 'absolute',
    display: 'none',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background[900]
  }
})

class Information extends Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        {this.state.show ? <Grid container className={`${classes.root}`}>
          
        </Grid> : null}
      </div>
    )
  }
}

export default withStyles(styles)(Information)
