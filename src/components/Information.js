import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    display: 'none',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background[900]
  }
}))

const Information = () => {
  const [show, setShow] = useState(false)
  const classes = useStyles()

  // Side effects
  useEffect(() => {

    return function cleanup() {

    }
  })

  return (
    <div>
        {show ? 
        <Grid container className={classes.root}>
            I am a hook!
        </Grid> : null}
    </div>
  )
}

export default Information
