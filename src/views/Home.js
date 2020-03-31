import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh"
  },
  h1: {
    margin: 0
  }
}))

const Home = () => {
  const classes = useStyles()
  return (
    <div className={`${classes.root}`}>
      <h1 className={classes.h1}>Welcome</h1>
    </div>
  )
}

export default Home
